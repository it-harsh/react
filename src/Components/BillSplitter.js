import React,{ useState , useRef} from 'react';
export default function BillSplitter(){

    const nameRef =  useRef();
    const amountRef =  useRef();

    const [inputName,setInputName] = useState("")
    const [nameList,setNameList]  = useState(["Select Name","Dhoni","Virat","Rohit"])
    const [amount,setAmount] = useState(0)
    const [dropDownName,setDropDownName] = useState("")
    const [avgPrice,setAvgPrice]  = useState(50)
    const [nameAmount,setNameAmount]  = useState([
        {
            name : "",
            amount  :  0
        },
        {
            name : "Dhoni",
            amount  :  110
        },
        {
            name : "Virat",
            amount  :  30
        },
        {
            name : "Rohit",
            amount  :  10
        }
    ])
    const [finalAmount,setFinalAmount]  = useState([
            {
                name : "",
                amount  : 0
            }
    ])

    const [transaction,setTransaction]  = useState([
        {
            from : "Rohit",
            to : "Dhoni",
            amount  : 40
        },
        {
            from : "Virat",
            to : "Dhoni",
            amount  : 20
        }
    ])
    
    const handleInputNameChange = (e) => {
        setInputName(e.target.value)
    }

    const handleAmountEntry = (e) => {
        setAmount(e.target.value)
    }

    const handleDropDownChange = (e)  => {
        setDropDownName(e.target.value)
    }

    const addName  =  (e)  =>  {
        e.preventDefault()
        if(inputName !== ""){
            setNameList([...nameList,inputName])
            nameRef.current.value = '';
            setInputName("")
            resetShare(e)
            // calculateShare(e)
        }
    }

    const addExpenseEntry = (e)  => {
        e.preventDefault()
        if(dropDownName !== "Select Name" && amount !== 0 && dropDownName !== "")  {
            setNameAmount([...nameAmount,{name:dropDownName,amount:amount}])
            amountRef.current.value = ''
            setAmount(0)
            resetShare(e)
            // calculateShare(e)
        }
    }

    const resetEntries = (e)  => {
        e.preventDefault()
        setNameAmount([
            {
                name : "",
                amount  :  0
            }
        ])
    }

    const  resetAll  = (e)  => {
        e.preventDefault()
        var confirmation = window.confirm("These will remove everything . Continue? ")
        console.log(confirmation)
        if(confirmation === true){
            setNameList(["Select Name"])
            resetEntries(e)
            resetShare(e)
        }
    }

    const resetShare = (e) =>  {
        e.preventDefault()
        setTransaction([
            {
                from : "",
                to : "",
                amount  : 0
            }
        ])
        setAvgPrice(0)
    }

    const handleExample = (e) => {
        //set  NameList
        setNameList(["Select Name","Dhoni","Virat","Rohit"])

        //set Expenses
        setNameAmount([
            {
                name : "",
                amount  :  0
            },
            {
                name : "Dhoni",
                amount  :  110
            },
            {
                name : "Virat",
                amount  :  30
            },
            {
                name : "Rohit",
                amount  :  10
            }
        ])

        //set cost per person
        setAvgPrice(50)

        //set Transactions
        setTransaction([
            {
                from : "Rohit",
                to : "Dhoni",
                amount  : 40
            },
            {
                from : "Virat",
                to : "Dhoni",
                amount  : 20
            }
        ])
    }

    // const resetAll = (e) => {
        //becuase calling resetName will inturn call confirm button which is not needed
    //     setNameList(["Select Name"])
    //     resetEntries(e)
    //     resetShare(e)
    // }

    const deleteItem = (e) => {
        e.preventDefault()
        setNameAmount((prev) => prev.filter((data,idx) => {
                    return (idx.toString() !== e.target.id)
        }))
        resetShare(e)
        // calculateShare(e)
    }
    const deleteName = (e) => {
        e.preventDefault()
        var indexName = nameList[parseInt(e.target.id)]
        // console.log(indexName)

        var flag  = false

        // Find if the name exist in expense list
        for(var j=0;j<nameAmount.length;j++){
            if(nameAmount[j].name == indexName){
                flag=true
            }
        }

        //filter now names (if exists) from expense list and then remove name from nameList
        if(flag == true){
            var confirmation = window.confirm("These will also remove entries from Expense List. Continue? ")
            console.log(confirmation)
            if(confirmation === true && flag == true){
                setNameAmount((prev) => prev.filter((z)  => {return z.name !== indexName}))
                setNameList((prev) => prev.filter((z)  => {return z !== indexName}))
                resetShare(e)
                // calculateShare(e)
            }
        }else{
            setNameList((prev) => prev.filter((z)  => {return z !== indexName}))
            resetShare(e)
            // calculateShare(e)
        }


    }

    const calculateShare  = (e) => {
        
        setFinalAmount([])
        //clear transaction history
        setTransaction([{}])
        
        var totalAmount  = 0;
        var avgAmount   = 0;
        
        for(let i =0 ; i< nameAmount.length ;i++){
            totalAmount += parseInt(nameAmount[i].amount)
        }
        
        avgAmount  = totalAmount  /  (nameList.length - 1) // because we added a dummy name at start

        setAvgPrice(avgAmount.toFixed(2))

        for(var i = 0; i<nameList.length  ; i++){
            var indAmount = 0
            if(nameList[i] !== "Select Name"){
                for(var j=0;j<nameAmount.length;j++){
                    if(nameAmount[j].name == nameList[i]){
                        indAmount += parseInt(nameAmount[j].amount)
                    }
                }
            }
            // console.log(nameList[i]," ",indAmount," ",avgAmount)
            // somehow this way only works creating obj and then passing it inside setFinalAmount using only prev otherwise it doesnt work
            const tempobj = {
                name:nameList[i],
                amount:indAmount-avgAmount
            }
            // console.log("tempobj ",tempobj)
            setFinalAmount((prev) =>  {
                return [...prev,tempobj]
            })
        }

        
        //removing select name entry and sorting array based on amount
        setFinalAmount((prev) => prev.sort((a,b) =>  {  return a.amount - b.amount}).filter((z) => {return (z.name.toString() !== 'Select Name')}))
        
        var start=0;
        var end=finalAmount.length-1;
        
        //shallow copy
        var t  = [...finalAmount]
        
        //deep copy examples
        // console.log("stringify ",JSON.parse(JSON.stringify(finalAmount)))
        t = JSON.parse(JSON.stringify(finalAmount))
        
        // console.log("t =  ",finalAmount)
        
        while(start<end){
            if(Math.abs(t[start].amount) >= Math.abs(t[end].amount)  && start<end){
                // console.log("start = ",start," & end = ",end)                
                t[start].amount = (t[start].amount + t[end].amount)
                // console.log(t[start].name," ===== ",Math.abs(t[end].amount) ,  " ===== > ",t[end].name)
                
                // set transaction items
                const ttrans = {
                    from:t[start].name,
                    to:t[end].name,
                    amount:Math.abs(t[end].amount.toFixed(2))
                }
                setTransaction((prev) =>  {
                    return [...prev,ttrans]
                })
                // console.log("ttrans ",ttrans)


                t[end].amount = 0
                end = end - 1;
            }
            else if(Math.abs(t[start].amount) <  Math.abs(t[end].amount)  && start<end){
                // console.log("start = ",start," & end = ",end) 
                t[end].amount = (t[start].amount + t[end].amount)
                // console.log(t[start].name," ===== ",Math.abs(t[start].amount) ,  " ===== > ",t[end].name)
                
                // set transaction items
                const ttrans = {
                    from:t[start].name,
                    to:t[end].name,
                    amount:Math.abs(t[start].amount.toFixed(2))
                }
                setTransaction((prev) =>  {
                    return [...prev,ttrans]
                })
                // console.log("ttrans ",ttrans)
                
                t[start].amount = 0
                start = start + 1;
            }
            // else if(Math.abs(t[start].amount) == Math.abs(t[end].amount) && start<end){
            //     // console.log("start = ",start," & end = ",end) 
            //     console.log(t[start].name,"  ===== ",t[end].amount ,  " ===== > ",t[end].name)
            //     t[end] = 0
            //     t[start] =  0;
            //     start = start +  1 ;
            //     end = end - 1 ;
            // }
        }

        // console.log("Final",finalAmount)

        //e.preventDefault() at the end so that everything is done and then it stops
        e.preventDefault()
    }

    return(
        <div>
            <h1> Split Your Bill ...  </h1>
            <form>
                <div>
                    <div>
                        <label><h3>Step 1 : &nbsp;</h3></label>
                        <input type="text" name="addName" required="required" ref={nameRef} placeholder='Enter name here' onChange={handleInputNameChange}></input>
                        &nbsp; 
                        <button className="btn btn-success"  onClick={addName}>Add Name</button>
                        &nbsp;
                        <button className="btn btn-danger"  onClick={resetAll}>Reset Names</button>
                        <br/>
                        <ul>
                            {
                                nameList.map(function(data,id){
                                    if(data !== "Select Name"){
                                        return  <li key={id} style={{fontSize:"17px",lineHeight:"2"}}>{data}&nbsp;&nbsp;
                                                <span id={id} style={{color:"red",lineHeight:"normal",border:"1px solid red"}} onClick={deleteName} type='button'>&nbsp;X&nbsp;</span>
                                                </li>
                                                
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
                
                <br/>
                <label><h3>Step 2 : &nbsp;</h3></label>
                <select className="form-select form-select-sm" style={{fontSize:"14px",display:'inline',width:"150px"}} onChange={handleDropDownChange}>
                    {nameList.map((f,id) =>  <option key={id}>{f}</option>)}
                </select>
                &nbsp;
                <input type="number" ref={amountRef} placeholder='Enter Expense Amount' onChange={handleAmountEntry}></input>
                &nbsp;
                <button  className="btn btn-success" onClick={addExpenseEntry}>Add Entry</button>
                &nbsp;
                <button  className="btn btn-danger" onClick={resetEntries}>Reset Entries</button>
                {/* <h1>Hello , Amount is  {amount} and Name is {dropDownName}</h1> */}
                <br/>
                <ul>
                    {nameAmount.map(function(data,id){
                        if(data.name !==  "" && data.amount !== 0){
                            return <li style={{fontSize:"17px",lineHeight:"2"}} key={id}> {data.name} paid Rs {data.amount}/-  &nbsp;
                                    <span id={id} style={{color:"red",lineHeight:"normal",border:"1px solid red"}} onClick={deleteItem} type='button'>&nbsp;X&nbsp;</span>
                                    </li>
                        }
                    }
                    )}
                </ul>
                <br/>
                <label><h3>Step 3 : &nbsp;</h3></label>
                <button className="btn btn-success" onClick={calculateShare}>Calculate Share</button>
                &nbsp;
                <button className="btn btn-danger" onClick={resetShare}>Reset Share</button>
                <br/>
                {/* <ul>
                    {
                    finalAmount.map(function(data,id){
                        if(data.amount >  0 && data.name  !== "Select Name"){
                            return <li> <h4> {data.name} needs to be paid Rs {data.amount}/-  </h4></li>
                        }
                        else if(data.amount < 0 && data.name  !==  "Select Name"){
                            return <li> <h4> {data.name} needs to pay Rs {Math.abs(data.amount)}/-  </h4></li>
                        }
                    })
                    }
                </ul> */}
                <br/>
                <h3><i><u>Cost Per Person is Rs {avgPrice}/-</u></i></h3>
                <br/>
                <ul>
                    {
                    transaction.map(function(data,id){
                        if(data.from !== '' && data.to !== '' && data.amount !== 0 && data.from !== undefined && data.to !== undefined && data.amount  !== undefined ){
                            // console.log(data.from,data.to,data.amount)
                            return <li key={id}> <h4> {data.from}  ===&gt;  {data.to} - Rs {data.amount}/-  </h4></li>
                        }
                    })
                    }
                </ul>
                <br/>
                <button className="btn btn-info" onClick={handleExample}>Default Example</button>
                &nbsp;
                <button className="btn btn-danger" onClick={resetAll}>Reset Everything</button>
            </form>
        </div>
    )
}