import React,{useState} from 'react'
import AdopterData from './AdopterData'
import { validation } from '../utils/validation'

const PetAdoptionForm = () => {
 const [formData, setFormData] = useState([])
 const [values, setValues] = useState({
  petName: "",
  petType: "Dog",
  breed: "",
  adopterName: "",
  email: "",
  phone: ""
 });
 
 const [showTable, setShowTable] = useState(false)
 // destructuring thee values object
 const {petName, petType, breed, adopterName, email, phone} = values;

 const [errors, setErrors] = useState({
  petName: "",
  petType: "",
  breed: "",
  adopterName: "",
  email: "",
  phone: ""
 })


   if (!showTable) {
    return (
      <div>
        <div>

        </div>
      </div>
    )
   }
  return <AdopterData></AdopterData>
  
}

export default PetAdoptionForm