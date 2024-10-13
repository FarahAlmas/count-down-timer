"use client"
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CountdownTimer(){
//-----------variables-----------------------
const [duration , setDuration] = useState<string | number>();
const [timeLeft , setTimeleft] = useState(0);
const [isActive , setIsActive] = useState<boolean>(false);
const timer = useRef<NodeJS.Timeout | null>(null);

//--------------------timeformat------------

const timeformat = (time:number):string => {
const minutes = Math.floor(time/60)
const seconds = time % 60 
return`${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
}
//----------------set btn----------------

const setBtn =()=>{
  if(typeof duration === 'number' && duration > 0){
    setTimeleft (duration)
  }
  }
//-------------------------start Btn-----------------------

const startBtn = ()=>{
  setIsActive(true)

}
useEffect(()=>{
  if(isActive){
    timer.current = setInterval(()=>{
      if(timeLeft > 0){
        setTimeleft((timeLeft)=> timeLeft - 1)
      }else{
        clearInterval(timer.current!)
        setIsActive(false)
      }
   },1000);
  

   }else{
    clearInterval(timer.current!)
   }
   return () => clearInterval(timer.current!); 

},[isActive ,timeLeft])





//----------------------pause Btn------------------------
const pauseBtn = ()=>{
  setIsActive(false)
 }


//--------------------reset Btn--------------------------
const resetBtn = ()=>{
  setIsActive(false)
  setTimeleft(0)
  setDuration("")
 }


  return(
    <div className="h-[400px] w-[600px] bg-[rgb(237,237,237)] rounded-[20px] border-[2px] border-[grey] text-[black] flex justify-center items-center flex-col">
      <h1 className="text-[40px] font-[600]">CountDown Timer</h1>

      <div className="flex gap-[10px] mt-[10px]">
        <Input type="number" placeholder="Enter duration in second" onChange={(e)=>{setDuration(Number(e.target.value))}} value={duration} className="w-[300px] text-[16px]"/>

        <Button onClick={()=>{setBtn()}}>Set</Button>
        </div>
        <div className="mt-[10px] font-[700] text-[50px]">{timeformat(timeLeft)}</div>


        <div className="flex gap-[30px]">
          <Button onClick={()=>{startBtn()}}>Start</Button>
          <Button onClick={()=>{pauseBtn()}}>Pause</Button>
          <Button onClick={()=>{resetBtn()}}>Reset</Button>
          
        </div>
        </div>
)
}
