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
        }
    }

    const addExpenseEntry = (e)  => {
        e.preventDefault()
        if(dropDownName !== "Select Name" && amount !== 0 && dropDownName !== "")  {
            setNameAmount([...nameAmount,{name:dropDownName,amount:amount}])
            amountRef.current.value = 0
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

    const  resetNames  = (e)  => {
        e.preventDefault()
        setNameList(["Select Name"])
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

    const resetAll = (e) => {
        resetEntries(e)
        resetNames(e)
        resetShare(e)
    }

    const calculateShare  = (e) => {
        e.preventDefault()

        setFinalAmount([])
        //clear transaction history
        setTransaction([{}])
        
        var totalAmount  = 0;
        var avgAmount   = 0;
        
        for(let i =0 ; i< nameAmount.length ;i++){
            totalAmount += parseInt(nameAmount[i].amount)
        }
        
        avgAmount  = totalAmount  /  (nameList.length - 1) // because we added a dummy name at start

        setAvgPrice(avgAmount)

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

        //sort successful
        finalAmount.sort((a,b) =>  {  return a.amount - b.amount})

        //removing select name entry
        setFinalAmount((prev) => prev.filter((z) => {return (z.name.toString() !== 'Select Name')}))
        
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
                    amount:Math.abs(t[end].amount)
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
                    amount:Math.abs(t[start].amount)
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

    }

    return(
        <div>
            <h1> Split Your Bill ...  </h1>
            <form>
                <label><h3>Step 1 : &nbsp;</h3></label>
                <input type="text" name="addName" pattern='[a-zA-Z\s]+' required="required" ref={nameRef} placeholder='Enter name here' onChange={handleInputNameChange}></input>
                &nbsp; 
                <button onClick={addName}>Add Name</button>
                &nbsp;
                <button onClick={resetNames}>Reset Names</button>
                <br/>
                <ul>
                    {
                        nameList.map(function(data,id){
                            if(data !== "Select Name"){
                                return  <li key={id}><h5>{data}</h5></li>
                            }
                        })
                    }
                </ul>
                <br/>
                <label><h3>Step 2 : &nbsp;</h3></label>
                <select onChange={handleDropDownChange}>
                    {nameList.map((f,id) =>  <option key={id}>{f}</option>)}
                </select>
                &nbsp;
                <input type="number" ref={amountRef} placeholder='Enter Expenses' onChange={handleAmountEntry}></input>
                &nbsp;
                <button  onClick={addExpenseEntry}>Add Entry</button>
                &nbsp;
                <button  onClick={resetEntries}>Reset Entries</button>
                {/* <h1>Hello , Amount is  {amount} and Name is {dropDownName}</h1> */}
                <br/>
                <ul>
                    {nameAmount.map(function(data,id){
                        if(data.name !==  "" && data.amount !== 0){
                            return <li key={id}> <h4> Name :  {data.name} paid Rs {data.amount}/-  </h4></li>
                        }
                    }
                    )}
                </ul>
                <br/>
                <label><h3>Step 3 : &nbsp;</h3></label>
                <button onClick={calculateShare}>Calculate Share</button>
                &nbsp;
                <button onClick={resetShare}>Reset Share</button>
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
                <button onClick={handleExample}>Default Example</button>
                &nbsp;
                <button onClick={resetAll}>Reset Everything</button>
            </form>
        </div>
    )
}