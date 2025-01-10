// courses code here
import axios from 'axios'
import React from 'react'


const Courses = () => {
  const [courses, setCourses] = useState([]); 
  const [message, setMessage] = useState("")

  useEffect(() => {
   const getCourses =  async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/courses')
        const {course,message} = response.data;
         setCourses(course || []);
         setMessage(message || "");
      } catch (error) {
         setMessage(error.response?.data?.message || "something went wrong")
      }
     
    }

    getCourses()
    return () => {
  
    }
  }, [])
  
 


  return (
    <div>
       {message && <div>
          {message}
          </div>}
      {courses.length > 0 ? (courses.map((course)=>(
        <div>
       
        <div key={course.courseId} >
            <img src={course.imageLink} alt={`Image of ${course.title}`} />
          </div>
          <h1>{course.title}</h1>
          <h2>
            {course.description}
          </h2>
          <div>
          </div>
        </div>
       ))
      ):(
        !message && <p> No course is available. </p>
      )}
    </div>
  )
}

export default Courses