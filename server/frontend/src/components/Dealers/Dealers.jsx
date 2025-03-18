import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"
import apiClient from '../../apiClient';

const dealerUrl ="/djangoapp/get_dealers";

const getDealers = async () => {
  const res = await apiClient.get(dealerUrl);
  return Array.from(res.dealers);
}

const getDealersByState = async (state) => {
  const res = await apiClient.get(dealerUrl + "/" + state);
  return Array.from(res.dealers);
}

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  let [states, setStates] = useState([])
 
  const filterDealers = async (state) => {
    setDealersList(await getDealersByState(state))
  }

  useEffect(() => {
    getDealers().then(dealers => {
      const states = new Set()
      dealers.forEach(dealer => states.add(dealer.state))
      setStates(Array.from(states).sort())
      setDealersList(dealers)
    })
  },[]);  


let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;
return(
  <div>
      <Header/>

     <table className='table'>
      <tr>
      <th>ID</th>
      <th>Dealer Name</th>
      <th>City</th>
      <th>Address</th>
      <th>Zip</th>
      <th>
      <select name="state" id="state" onChange={(e) => filterDealers(e.target.value)}>
      <option value="" selected disabled hidden>State</option>
      <option value="All">All States</option>
      {states.map(state => (
          <option value={state}>{state}</option>
      ))}
      </select>        

      </th>
      {isLoggedIn ? (
          <th>Review Dealer</th>
         ):<></>
      }
      </tr>
     {dealersList.map(dealer => (
        <tr>
          <td>{dealer['id']}</td>
          <td><a href={'/dealer/'+dealer['id']}>{dealer['full_name']}</a></td>
          <td>{dealer['city']}</td>
          <td>{dealer['address']}</td>
          <td>{dealer['zip']}</td>
          <td>{dealer['state']}</td>
          {isLoggedIn ? (
            <td><a href={`/postreview/${dealer['id']}`}><img src={review_icon} className="review_icon" alt="Post Review"/></a></td>
           ):<></>
          }
        </tr>
      ))}
     </table>;
  </div>
)
}

export default Dealers
