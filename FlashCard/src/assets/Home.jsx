import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  const [flashCards, setFlashCards] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [currentIndex,setCurrentIndex] = useState(0)

  useEffect(() => {
    const getData = async () => {
      let result = await fetch("http://localhost:4000/api/flashcards", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      result = await result.json();
      if (result.success) {
        setFlashCards(result.data)
        console.log(result)
      }
      else {
        console.log("error")
      }
    }

    getData()
  }, [])

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashCards.length - 1 : prevIndex - 1
    );
  };


  const handleNext = () => {
    if(flipped){
      setFlipped(false)
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashCards.length);
    
  };


  return (
    <div className='home flex flex-col gap-4 items-center'>
      <div className='text-3xl font-bold text-center'>Welcome to Flashcard Learning Tool</div>
        {   flashCards.length > 0 && (
              <div className='flashcard' onClick={() => setFlipped(!flipped)}>
              <div className={`card ${flipped ? 'flipped' : ''}`}>
                   <div className='front  flex justify-center items-center text-lg'>{flashCards[currentIndex].question}</div>
                   <div className='back flex justify-center items-center text-lg'>{flashCards[currentIndex].answer}</div>
            </div>
            </div>
        )
        } 

        <div className='flex gap-16'>
              <button onClick={handlePrevious} disabled={flashCards.length === 0} className='bg-black text-white p-3 w-[100px] hover:bg-white hover:text-black border hover:border-black'>Previous</button>
              <button onClick={handleNext} disabled={flashCards.length === 0} className='bg-black text-white p-3 w-[100px] hover:bg-white hover:text-black border hover:border-black'>Next</button>
        </div>

        <div>
          <Link to="/dashboard" className='text-blue-500 border-b border-blue-600'>Go to Dashboard</Link>
        </div>
     
    </div>
  )
}

export default Home
