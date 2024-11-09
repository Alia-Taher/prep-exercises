import { useState } from 'react';
import Button from './Button';
import Count from './Count';




const Counter = () => {

 const [count , setCount] = useState(0);

 const feedback =  count > 10 ? "'It's higher than 10" : "Keep counting" ;
  


  return (
    <>
    <h1>Counter</h1>
    <h2>{feedback}</h2>
    <Count count={count}/>
    <Button addOne={() => {
        setCount(count + 1);
        if (count == 11) {
          setCount(0);
        }   
    }}/>
    </>
  )
}

export default Counter