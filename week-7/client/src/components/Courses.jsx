// courses code here
import axios from 'axios'
import React from 'react'


const Courses = () => {
  const [courses, setCourses] = useState([]); 
  const [message, setMessage] = useState("")

  useEffect(() => {
    async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/courses')
        const {course,message} = response.data;
         setCourses(course);
         setMessage(message);
      } catch (error) {
         setMessage(error.response?.data?.message)
      }
     
    }
    return () => {
      setCourses([]);
    }
  }, [])
  
 


  return (
    <div>
      {courses.map((course)=>{
        <div>
          {message && <div>
            {message}
            {}
            </div>}
          <div>
            <img src={course.imageLink} alt={course.imageLink} />
          </div>
          <h1>{course.title}</h1>
          <h2>
            {course.description}
          </h2>
          <div>
          </div>
        </div>
      })}
    </div>
  )
}

export default Courses