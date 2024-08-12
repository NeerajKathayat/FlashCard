import React, { useState, useEffect } from 'react'
import './Home.css'
import './Dashboard.css'
import { Link } from 'react-router-dom';
const Dashboard = () => {
    const [flashcards, setFlashCards] = useState([]);
    const [modal , setModal] = useState(false)
    const [ques , setQues] = useState('')
    const [ans , setAns] = useState('')
    const [noteID , setNoteID] = useState(null)
     
    useEffect(() => {
        const getData = async () => {
            let result = await fetch("https://flashcardbackend-1-jab6.onrender.com/api/flashcards", {
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


    const addFlashcard = async () => {
        try {
            const response = await fetch('https://flashcardbackend-1-jab6.onrender.com/api/flashcards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({question: ques, answer: ans }),
            });
            const data = await response.json();
            setFlashCards([...flashcards, data]);

            setModal(false)

            setQues('')
            setAns('')
        } catch (error) {
            console.error(error);
        }
    };





    const deleteFlashcard = async (id) => {
        try {
            await fetch(`https://flashcardbackend-1-jab6.onrender.com/api/flashcards/${id}`, {
                method: 'DELETE',
            });

            setFlashCards(flashcards.filter(fc => fc.id !== id));
        } catch (error) {
            console.error(error);
        }
    };


    
    const showModal = (note)=>{
             setNoteID(note.id)
             setQues(note.question)
             setAns(note.answer)
             setModal(true)
    }


 const UpdateFlashcard=async ()=>{
    try {
        const response = await fetch(`https://flashcardbackend-1-jab6.onrender.com/api/flashcards/${noteID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({question: ques, answer: ans }),
        });
        const data = await response.json();
        console.log(data)
        
        
        setFlashCards(prevFlashcards =>
            prevFlashcards.map(fc =>
                fc.id === data.id ? data : fc
            )
        );

        fetchData()

        setQues('')
        setAns('')
        setModal(false)


        
       

    } catch (error) {
        console.error(error);
    }
 }


 const  fetchData = async () => {
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



    return (
        <div className='relative '>
            <div className='bg-blue-800 p-3 mb-3 flex gap-9'>
            <h2 className='text-3xl'>Dashboard</h2>
            <Link className='text-3xl border-b-2 border-black' to="/">Go to HomePage</Link>
            </div>

            <div className='flex gap-4 flex-wrap px-5 max-w-[1300px] mx-auto'>
                {
                    flashcards.map((ele, index) => {
                        return <div className='w-[300px] mx-auto bg-yellow-500 p-3 flex flex-col gap-4' key={index}>
                            <div className='text-lg'>
                                <span className='font-bold'>Ques:</span>
                                {ele.question}
                            </div>
                            <div className='text-lg'><span className='font-bold'>Ans:</span>{ele.answer}</div>
                            <div className='flex gap-3'>
                                <button onClick={()=> showModal(ele)} className='bg-black text-white p-3 w-[100px] hover:bg-white hover:text-black border hover:border-black'>Update</button>
                                <button onClick={() => deleteFlashcard(ele.id)} className='bg-black text-white p-3 w-[100px] hover:bg-white hover:text-black border hover:border-black'>Delete</button>
                            </div>

                        </div>

                    })
                }
            </div>

            <div onClick={()=> setModal(!modal)} className='fixed bottom-5 right-8 text-4xl bg-blue-700 py-1 px-3 rounded-md text-white cursor-pointer hover:bg-blue-500'>
                <span>+</span>
            </div>






           {
              modal && (
                <div className='overlay' onClick={()=>setModal(false)}>
                <div className='bg-white flex flex-col gap-7 p-6 w-[400px]' onClick={(e)=> e.stopPropagation()}>
                      <h1 className='text-2xl font-bold'>Enter Question and Answer</h1>
                      <textarea type="text" className='h-[150px] p-2' value={ques} onChange={(e)=>{setQues(e.target.value)}} placeholder='Enter Question'/>
                      <textarea type="text" className='h-[150px] p-2' value={ans} onChange={(e)=>{setAns(e.target.value)}} placeholder='Enter Answer' />

                      {noteID ? 
                       (
                        <button onClick={UpdateFlashcard} className='text-xl bg-blue-700 py-1 px-3 rounded-md text-white cursor-pointer hover:bg-blue-500'>Update</button>
                       )  : 
                       (
                        <button onClick={addFlashcard} className='text-xl bg-blue-700 py-1 px-3 rounded-md text-white cursor-pointer hover:bg-blue-500'>Add</button>
                       )}
                 </div>   

         </div>
              )
           }
        </div>
    )
}

export default Dashboard

