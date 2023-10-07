import React,{ useState , useRef} from 'react';
export default function BillSplitter(){

    const nameRef =  useRef();
    const amountRef =  useRef();

    const [inputName,setInputName] = useState("")
    const [nameList,setNameList]  = useState(["Select Name","a","b","c","d"])
    const [amount,setAmount] = useState(0)
    const [dropDownName,setDropDownName] = useState("")
    const [nameAmount,setNameAmount]  = useState([
        {
            name : "",
            amount  :  0
        },
        {
            name : "a",
            amount  :  10
        },
        {
            name : "b",
            amount  :  30
        },
        {
            name : "c",
            amount  :  80
        },
        {
            name : "d",
            amount : 80
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
            to : "",
            from : "",
            amount  : 0
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
            // nameRef.current.value = '';
        }
    }

    const addExpenseEntry = (e)  => {
        e.preventDefault()
        if(dropDownName !== "Select Name" && amount !== 0 && dropDownName !== "")  {
            setNameAmount([...nameAmount,{name:dropDownName,amount:amount}])
            // amountRef.current.value = 0
        }
    }

    const calculateShare  = (e) => {
        e.preventDefault()
        setFinalAmount([])
        
        var totalAmount  = 0;
        var avgAmount   = 0;
        
        for(let i =0 ; i< nameAmount.length ;i++){
            totalAmount += parseInt(nameAmount[i].amount)
        }
        
        avgAmount  = totalAmount  /  (nameList.length - 1) // because we added a dummy name at start

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
        setFinalAmount(finalAmount.filter((z) => {return (z.name.toString() !== 'Select Name')}))
        
        var start=0;
        var end=finalAmount.length-1;
        //shallow copy
        var t  = [...finalAmount]

        //deep copy examples
        // console.log("stringify ",JSON.parse(JSON.stringify(finalAmount)))
        t = JSON.parse(JSON.stringify(finalAmount))
        
        //clear transaction history
        setTransaction([{}])

        console.log("t =  ",finalAmount)

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
                console.log("ttrans ",ttrans)


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
                console.log("ttrans ",ttrans)

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
                <label><h3>Step 1 : Add Names &nbsp;</h3></label>
                <input type="text" name="addName" required="required" ref={nameRef} placeholder='Enter name here' onChange={handleInputNameChange}></input>
                &nbsp; <button onClick={addName}>Add Name</button>
                <br/>
                <ul>
                    {
                        nameList.map(function(data,id){
                            if(data !== "Select Name"){
                                return  <li><h5>{data}</h5></li>
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
                {/* <h1>Hello , Amount is  {amount} and Name is {dropDownName}</h1> */}
                <br/>
                <ul>
                    {nameAmount.map(function(data,id){
                        if(data.name !==  "" && data.amount !== 0){
                            return <li> <h4> Name :  {data.name} paid Rs {data.amount}/-  </h4></li>
                        }
                    }
                    )}
                </ul>
                <br/>
                <label><h2>Final Step  : &nbsp;</h2></label>
                <button onClick={calculateShare}>Calculate Share</button>
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
                <ul>
                    {
                    transaction.map(function(data,id){
                        if(data.from !== '' && data.to !== '' && data.amount !== 0 && data.from !== undefined && data.to !== undefined && data.amount  !== undefined ){
                            console.log(data.from,data.to,data.amount)
                            return <li> <h4> {data.from}  ===&gt;  {data.to} - Rs {data.amount}/-  </h4></li>
                        }
                    })
                    }
                </ul>
            </form>
        </div>
    )
}