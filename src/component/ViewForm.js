import React, { useState, useEffect } from 'react';
import '../assets/jss/components/ViewForm.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// helpers
import { isNullOrUndefined } from '../utils/helpers';
import { useParams } from 'react-router-dom';
// constant
import { apiRoot } from '../constant/index';
function ViewForm() {
  let { formID } = useParams();
  const [data, setData] = useState([])
  // console.log(formID)

  useEffect(() => {
    // check isNew user
    if(isNullOrUndefined(formID)) return;

    // get data co id)
    async function getData() {
      // console.log(formID)
      try {
        const result = await getDataBlogs(formID);
         // faild
        if (!result) return;
    
        // success
        // console.log(result)
        setData(result);
      } catch (error) {
        return;
      }
    }

    getData();
  }, [formID]);
  // console.log(data)
  return (
    <div className="main">
      <ul className="list-unstyled">
        <li className="media">
          <img src={data.image} className="mr-3" alt='img' />
              <div className="media-body">
              <h5 className="mt-0 mb-1">{data.title}</h5>
              {data.content}
              </div>
          </li>
      </ul>
    </div>
  );
}
//get data
async function getDataBlogs(formID) {
  // console.log(formID)
  try {
    const res = await axios.get( `${apiRoot}/blogs/${formID}` );
    // error
    if (res.status !== 200 && res.status !== 201) {
      return null;
    }
    // console.log(res.data);
    return res.data;
  } catch (error) {
    return null;
  }
}
export default ViewForm;