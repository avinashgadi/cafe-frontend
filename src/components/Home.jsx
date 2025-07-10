import React from 'react'
export default function Home({name,age}) {
    let id=2;
  return (
    <div className="text-3xl text-center">
      <h1 style={{backgroundColor:"orange", color:"black"}}>Hello {name}.You are {age} years old.</h1>
      <h2 className="text-lg">Your student id is {id}</h2>
      <p className="text-sm">This is paragraph</p>
        <p></p>
    </div>
  )
}

