// courses code here
import axios from 'axios'
import React from 'react'


const Courses = () => {
  const [courses, setCourses] = useState([]); 
  const [message, setMessage] = useState("")

  async function getCourses() {
    const response = await axios.get('http://localhost:3000/users/courses')
    const {course,message} = response.data;
     setCourses(course);
     setMessage(message);
  }


  return (
    <div>
      {courses.map((course)=>{
        <div>
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