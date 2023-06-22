
import swal from 'sweetalert';
export const Addteams = async (TeamName,TeamHonour,TotalPlayers,TeamImage) => {
  const formData = new FormData();
  formData.append("TeamName", TeamName);
  formData.append("TeamHonour", TeamHonour);
  formData.append("TotalPlayers", TotalPlayers);
  formData.append("TeamImage", TeamImage);
  
  // CategoryImage.name 
  

  try {
  console.log(TeamName);
    const response= await fetch("http://localhost:8000/team/createteam",{
      
         method:'post',
         body:formData,
         headers:{
           
             Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}` 
             
         }

     })
    //  const result=await response.json();
     
 
    //  if (!response.ok) {
    
    //      throw new Error(`Error! status:`);
    //    }
       if(response.status===200)
    {
     
      response = await response.json();
      return response;
    }
       if(response.status===400)
       {
       swal({
         icon: 'error',
         title: 'Oops...Duplicate Team Credentials',
         text: 'Duplicate entry not alloweed!',
         
       })
       
      }
    
 }
 catch (err) {
     console.log(err);
    
   }
};

  export const GetListOfCategory = async () => {
    console.log("heloooo CATEGORY");
    let result = await fetch(
      "http://localhost:8000/team/listofteams",
      {
        headers: {
          Authorization: `bearer ${JSON.parse(
            localStorage.getItem("admintoken")
          )}`,
        },
  
      }
    )
    
    result = await result.json();
    console.log(result);
    return result.teamdata;
  };

  export const DeleteTeamService = (_id) => {
   
    fetch(`http://localhost:8000/team/${_id}`,
     { 
    method: "DELETE" ,
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}` 
    },
  }).then(
      (result) => {
        result.json().then((response) => {
          console.warn(response);
        
        });
      }
    );
  };

  export async function UpdateeamService(item) {
    const formData = new FormData();
    formData.append("TeamName",item.TeamName);
    formData.append("TotalPlayers",item.TotalPlayers);
    formData.append("TeamHonour",item.TeamHonour);
     formData.append("TeamImage", item.TeamImage);
  
    let result = await fetch(
      `http://localhost:8000/team/${item._id}`,
      {
        method: "PUT",
        body:formData,
        headers: {
         
          Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}`
        },
      }
    );
    // if(result.status===200)
    // {
      
    //   result = await result.json();
    //   return result;
    // }
    result = await result.json();
    return result;
 
    

  };