import React, { useState, useRef } from 'react';

export default function BillSplitter() {
  const nameRef = useRef();
  const amountRef = useRef();

  const [inputName, setInputName] = useState('');
  const [nameList, setNameList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [dropDownName, setDropDownName] = useState('');
  const [avgPrice, setAvgPrice] = useState(0);
  const [nameAmount, setNameAmount] = useState([]);
  const [transaction, setTransaction] = useState([]);

  const addName = (e) => {
    e.preventDefault();
    const trimmed = inputName.trim();
    if (trimmed !== '' && !nameList.includes(trimmed)) {
      setNameList([...nameList, trimmed]);
      nameRef.current.value = '';
      setInputName('');
      clearResults();
    }
  };

  const addExpenseEntry = (e) => {
    e.preventDefault();
    if (dropDownName !== '' && amount > 0) {
      setNameAmount([...nameAmount, { name: dropDownName, amount: Number(amount) }]);
      amountRef.current.value = '';
      setAmount(0);
      clearResults();
    }
  };

  const clearResults = () => {
    setTransaction([]);
    setAvgPrice(0);
  };

  const resetEntries = (e) => {
    e.preventDefault();
    setNameAmount([]);
    clearResults();
  };

  const resetAll = (e) => {
    e.preventDefault();
    if (window.confirm('This will remove everything. Continue?')) {
      setNameList([]);
      setNameAmount([]);
      clearResults();
      setDropDownName('');
    }
  };

  const deleteItem = (e, idx) => {
    e.preventDefault();
    setNameAmount((prev) => prev.filter((_, i) => i !== idx));
    clearResults();
  };

  const deleteName = (e, idx) => {
    e.preventDefault();
    const name = nameList[idx];
    const hasExpenses = nameAmount.some((entry) => entry.name === name);

    if (hasExpenses) {
      if (!window.confirm(`This will also remove ${name}'s expenses. Continue?`)) return;
      setNameAmount((prev) => prev.filter((z) => z.name !== name));
    }
    setNameList((prev) => prev.filter((z) => z !== name));
    clearResults();
  };

  const handleExample = (e) => {
    e.preventDefault();
    setNameList(['Dhoni', 'Virat', 'Rohit']);
    setNameAmount([
      { name: 'Dhoni', amount: 110 },
      { name: 'Virat', amount: 30 },
      { name: 'Rohit', amount: 10 },
    ]);
    setAvgPrice(50);
    setTransaction([
      { from: 'Rohit', to: 'Dhoni', amount: 40 },
      { from: 'Virat', to: 'Dhoni', amount: 20 },
    ]);
  };

  const calculateShare = (e) => {
    e.preventDefault();

    if (nameList.length < 2) return;
    if (nameAmount.length === 0) return;

    // Step 1: Calculate total and average
    let totalAmount = 0;
    for (let i = 0; i < nameAmount.length; i++) {
      totalAmount += Number(nameAmount[i].amount);
    }
    const avgAmount = totalAmount / nameList.length;
    setAvgPrice(avgAmount.toFixed(2));

    // Step 2: Calculate individual balances
    const balances = nameList.map((name) => {
      let paid = 0;
      for (let j = 0; j < nameAmount.length; j++) {
        if (nameAmount[j].name === name) {
          paid += Number(nameAmount[j].amount);
        }
      }
      return { name, amount: paid - avgAmount };
    });

    // Step 3: Sort balances (negative first, positive last)
    balances.sort((a, b) => a.amount - b.amount);

    // Step 4: Two-pointer settlement algorithm
    const settlements = [];
    const t = balances.map((b) => ({ ...b })); // deep copy
    let start = 0;
    let end = t.length - 1;

    while (start < end) {
      if (Math.abs(t[start].amount) < 0.01) { start++; continue; }
      if (Math.abs(t[end].amount) < 0.01) { end--; continue; }

      const transferAmount = Math.min(Math.abs(t[start].amount), Math.abs(t[end].amount));

      settlements.push({
        from: t[start].name,
        to: t[end].name,
        amount: Number(transferAmount.toFixed(2)),
      });

      t[start].amount += transferAmount;
      t[end].amount -= transferAmount;

      if (Math.abs(t[start].amount) < 0.01) start++;
      if (Math.abs(t[end].amount) < 0.01) end--;
    }

    setTransaction(settlements);
  };

  const hasResults = transaction.length > 0;

  return (
    <div className="splitter">
      {/* Header */}
      <div className="splitter-header">
        <h1>
          Split<span>Share</span>
        </h1>
        <p>Split expenses fairly among friends</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Step 1: Add Names */}
        <div className="card">
          <div className="card-title">
            <span className="step-badge">1</span>
            <h2>Add People</h2>
          </div>

          <div className="input-row">
            <input
              type="text"
              ref={nameRef}
              placeholder="Enter a name"
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addName(e)}
            />
            <button className="btn btn-primary" onClick={addName}>
              Add
            </button>
          </div>

          {nameList.length === 0 ? (
            <div className="empty-state">No people added yet</div>
          ) : (
            <ul className="list">
              {nameList.map((name, id) => (
                <li key={id} className="list-item">
                  <span className="list-item-text">
                    <span className="list-item-name">{name}</span>
                  </span>
                  <button className="delete-btn" onClick={(e) => deleteName(e, id)} title="Remove">
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Step 2: Add Expenses */}
        <div className="card">
          <div className="card-title">
            <span className="step-badge">2</span>
            <h2>Add Expenses</h2>
          </div>

          <div className="input-row">
            <select onChange={(e) => setDropDownName(e.target.value)} value={dropDownName}>
              <option value="">Select person</option>
              {nameList.map((name, id) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <input
              type="number"
              ref={amountRef}
              placeholder="Amount"
              min="0"
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addExpenseEntry(e)}
            />
            <button className="btn btn-primary" onClick={addExpenseEntry}>
              Add
            </button>
          </div>

          {nameAmount.length === 0 ? (
            <div className="empty-state">No expenses recorded yet</div>
          ) : (
            <>
              <ul className="list">
                {nameAmount.map((data, id) => (
                  <li key={id} className="list-item">
                    <span className="list-item-text">
                      <span className="list-item-name">{data.name}</span>
                      <span className="list-item-amount">paid &#8377;{data.amount}</span>
                    </span>
                    <button className="delete-btn" onClick={(e) => deleteItem(e, id)} title="Remove">
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '0.75rem' }}>
                <button className="btn btn-danger" onClick={resetEntries}>
                  Clear Expenses
                </button>
              </div>
            </>
          )}
        </div>

        {/* Step 3: Calculate */}
        <div className="card">
          <div className="card-title">
            <span className="step-badge">3</span>
            <h2>Settlement</h2>
          </div>

          <div className="btn-group" style={{ marginBottom: '1rem' }}>
            <button
              className="btn btn-primary"
              onClick={calculateShare}
              disabled={nameList.length < 2 || nameAmount.length === 0}
            >
              Calculate Share
            </button>
            {hasResults && (
              <button className="btn btn-danger" onClick={(e) => { e.preventDefault(); clearResults(); }}>
                Clear
              </button>
            )}
          </div>

          {hasResults && (
            <>
              <div className="result-card">
                <div className="result-label">Cost per person</div>
                <div className="result-value">&#8377;{avgPrice}</div>
              </div>

              {transaction.length === 0 ? (
                <div className="empty-state">Everyone is settled up!</div>
              ) : (
                <div>
                  {transaction.map((data, id) => (
                    <div key={id} className="transaction-item">
                      <span className="transaction-from">{data.from}</span>
                      <span className="transaction-arrow">&rarr;</span>
                      <span className="transaction-to">{data.to}</span>
                      <span className="transaction-amount">&#8377;{data.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {!hasResults && (
            <div className="empty-state">
              Add at least 2 people and some expenses, then calculate
            </div>
          )}
        </div>
      </form>

      {/* Footer */}
      <div className="splitter-footer">
        <div className="btn-group">
          <button className="btn btn-secondary" onClick={handleExample}>
            Load Example
          </button>
          <button className="btn btn-danger" onClick={resetAll}>
            Reset Everything
          </button>
        </div>
        <p className="footer-text">
          Built by <a href="https://github.com/it-harsh" target="_blank" rel="noopener noreferrer">Harsh Patel</a>
        </p>
      </div>
    </div>
  );
}
