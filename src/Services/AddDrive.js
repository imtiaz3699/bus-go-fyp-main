const AddDriver= async (values) => {
  console.log(values)
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:  JSON.stringify({
          firstName:values.firstName,
          lastName:values.lastName,
          email:values.email,
          phone:values.phone,
          cnic:values.cnic,
          accountCreated:values.accountCreated,
          vehicleType:values.vehicleType
        })
    };
    fetch('http://localhost:8000/employee/addEmployee', requestOptions)
        .then(response => {return response})
     
    } catch (err) {
      console.log(err);
    }
  };
  
  export default AddDriver;