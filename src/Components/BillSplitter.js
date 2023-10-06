import React,{ useState } from 'react';
export default function BillSplitter(){

    const [inputName,setInputName] = useState("")
    const [nameList,setNameList]  = useState(["Select Name"])
    const [amount,setAmount] = useState(0)
    const [dropDownName,setDropDownName] = useState("")
    const [nameAmount,setNameAmount]  = useState([
        {
            name : "",
            amount  :  0
        }
    ])
    const [finalAmount,setFinalAmount]  = useState([
            {
                name : "",
                amount  : 0
            }
    ])

    const addName  =  (e)  =>  {
        e.preventDefault()
        if(inputName !== ""){
            setNameList([...nameList,inputName]) 
            setInputName("")
        }
    }

    const handleInputNameChange = (e) => {
        setInputName(e.target.value)
    }

    const handleAmountEntry = (e) => {
        setAmount(e.target.value)
    }

    const handleDropDownChange = (e)  => {
        setDropDownName(e.target.value)
    }

    const addExpenseEntry = (e)  => {
        e.preventDefault()
        if(dropDownName !== "Select Name" && amount !== 0 && dropDownName !== "")  {
            setNameAmount([...nameAmount,{name:dropDownName,amount:amount}])
        }
    }

    const calculateShare  = (e) => {
        e.preventDefault()
        setFinalAmount([{}])
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
            console.log("tempobj ",tempobj)
            setFinalAmount((prev) =>  {
                return [...prev,tempobj]
            })
        }

        // console.log("final",finalAmount)

    }

    return(
        <div>
            <h1> Split Your Bill ...  </h1>
            <form>
                <label>Step 1 : Add Names &nbsp;</label>
                <input type="text" name="addName" required="required" placeholder='Enter name here' onChange={handleInputNameChange}></input>
                &nbsp; <button onClick={addName}>Add Name</button>
                <ul>
                    {
                        nameList.map(function(data,id){
                            if(data !== "Select Name"){
                                return  <li>{data}</li>
                            }
                        })
                    }
                </ul>
                <label>Step 2 : &nbsp;</label>
                <select onChange={handleDropDownChange}>
                    {nameList.map((f,id) =>  <option key={id}>{f}</option>)}
                </select>
                &nbsp;
                <input type="number" onChange={handleAmountEntry}></input>
                &nbsp;
                <button  onClick={addExpenseEntry}>Add Entry</button>
                {/* <h1>Hello , Amount is  {amount} and Name is {dropDownName}</h1> */}
                <ul>
                    {nameAmount.map(function(data,id){
                        if(data.name !==  "" && data.amount !== 0){
                            return <li> <h2> Name :  {data.name} paid Rs {data.amount}/-  </h2></li>
                        }
                    }
                    )}
                </ul>
                <label>Final Step  : &nbsp;</label>
                <button onClick={calculateShare}>Calculate Share</button>
                <ul>
                    {
                    finalAmount.map(function(data,id){
                        if(data.amount >  0 && data.name  !== "Select Name"){
                            return <li> <h2> {data.name} needs to be paid Rs {data.amount}/-  </h2></li>
                        }
                        else if(data.amount < 0 && data.name  !==  "Select Name"){
                            return <li> <h2> {data.name} needs to pay Rs {Math.abs(data.amount)}/-  </h2></li>
                        }
                    })
                    }
                </ul>
            </form>
        </div>
    )
}