const AddFleet= async (values) => {
    console.log(values)
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:  JSON.stringify({
            VehicleName:values.VehicleName,
            VehicleMake:values.VehicleMake,
            VehicleModel:values.VehicleModel,
            VehicleYear:values.VehicleYear,
            VehicleColor:values.VehicleColor,
            VehicleNumberPlate:values.VehicleNumberPlate,
            VehicleType:values.VehicleType,
            IsVehicleAC:values.IsVehicleAC,
            VehicleCapacity:values.VehicleCapacity,
          })
      };
      fetch('http://localhost:8000/Fleet/addFleet', requestOptions)
          .then(response => {return response})
       
      } catch (err) {
        console.log(err);
      }
    };
    
    export default AddFleet;

      
       
   