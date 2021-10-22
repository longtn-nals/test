import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import queryString from 'query-string';
// helpers
import { 
  isNullOrUndefined, 
  isNullOrEmpty } from './utils/helpers';
// constant
import { apiRoot, folderRoot } from './constant/index';
import Pagination from './component/Pagination';
export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  })
  const [filters, setFilter] = useState({ 
    page: 1,
    limit: 10,
  })
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [sort, setSort] = useState ('desc');
  const [dataAll, setDataAll] = useState ([]);
  const [filterstitle, setFilterTitle] = useState (null)
  const [filteredTitleResults, setFilteredTitleResults] = useState([]);
// console.log(filteredTitleResults)
  useEffect(() => {
    async function getDataBlogAll() {
      // call api get data
      const result = await getDataBlogsAll(null);
      // faild
      if (!result) return;
  
      // success
      // console.log(result)
      setDataAll(result);
    }
    
    async function getData() {
      if (isNullOrUndefined(filters)) return;
      const paramString = queryString.stringify(filters);
      // show loading
      setisLoading(true);
      // call api get data
      const result = await getDataBlogs(paramString)
      // faild
      if (!result) return;
      // hide loading
      setisLoading(false);
      setData(result);
      setPagination(filters);
    }
    async function getDataFilter() {
      if (isNullOrUndefined(filterstitle)) return;
      const paramString = queryString.stringify(filterstitle);
      // console.log(paramString)
      try {
        const result = await axios.get(`${apiRoot}/blogs?${paramString}`);
        // error
        if (result.status !== 200 && result.status !== 201) {
          return null;
        }
        if (result.status === 429 ) {
          return null;
        }
        const filteredData = result.data
        // console.log(filteredData)
        setFilteredTitleResults(filteredData)
      } catch (error) {
        // console.log(error)
        return null;
      }
    }
    
    getDataBlogAll();
    getData();
    getDataFilter();
  }, [filters, filterstitle]);
  const onTop = () => {
    window.scrollTo(0, 0)
  }
  
  // console.log(searchInput)
  const searchItems = async (searchValue) => {
    setSearchInput(searchValue)
    // console.log(searchInput)
    if (isNullOrUndefined(searchInput)) {
      
      setFilteredResults(data)
      // console.log(searchInput)
      // const filteredData = dataAll.filter((item) => {
      //     return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      // })
    }
    else{
      try {
        const result = await axios.get(`${apiRoot}/blogs?search=${searchInput}`);
        // error
        if (result.status !== 200 && result.status !== 201) {
          return null;
        }
        if (result.status === 429 ) {
          return null;
        }
        const filteredData = result.data
        // console.log(filteredData)
        setFilteredResults(filteredData)
      } catch (error) {
        // console.log(error)
        // return null;
      }
    }
  }
  const handlePageChange = (newPage) => {
    setFilter({
      ...filters,
      page: newPage,
    })
  };
// render books
const blogs = [];
{!isNullOrEmpty(filteredTitleResults) ? (
  filteredTitleResults.map((row, i) => {
    blogs.push(
      <ul className="list-unstyled" key={i}>
        <a className="mr-3" href={`${folderRoot}ViewForm/${row.id}`}>
          <li className="media">
              <img src={row.image} className="mr-3" alt='img' />
              <div className="media-body">
                <h5 className="mt-0 mb-1">{row.title}</h5>
                {row.content}
              </div>
          </li>
        </a>
      </ul>
    )}
  )) :
  !isNullOrEmpty(searchInput) ? (
  filteredResults.map((row, i) => {
    blogs.push(
      <ul className="list-unstyled" key={i}>
        <a className="mr-3" href={`${folderRoot}ViewForm/${row.id}`}>
          <li className="media">
              <img src={row.image} className="mr-3" alt='img' />
              <div className="media-body">
                <h5 className="mt-0 mb-1">{row.title}</h5>
                {row.content}
              </div>
          </li>
        </a>
      </ul>
    )}
  )) : (
  data.length > 0 &&
  data.map((row, i) => {
    blogs.push(
      <ul className="list-unstyled" key={i}>
        <a className="mr-3" href={`${folderRoot}ViewForm/${row.id}`}>
          <li className="media">
              <img src={row.image} className="mr-3" alt='img' />
              <div className="media-body">
                <h5 className="mt-0 mb-1">{row.title}</h5>
                {row.content}
              </div>
          </li>
        </a>
      </ul>
    )}
  ))}
  const handleSort = async (flag) => {
    const paramString = queryString.stringify(filters);

    // show loading
    setisLoading(true);
    if (!isNullOrUndefined(flag) && flag === 'asc') {
      setSort('desc')
    } else if (!isNullOrUndefined(flag) && flag === 'desc') {
      setSort('asc')
    }
    const result = await getDataBlogsSort(paramString, sort);
    // faild
    if (!result) return;
    // show loading
    setisLoading(false);
    setData(result)
  }
  // rending option title
  const optionTitle = []
  !isNullOrEmpty(dataAll) &&
  dataAll.map(e => {
    optionTitle.push (
      <option value={e.title} key={e.id}>
        {e.title}
      </option>
    );
  });
  const handleChange = name => e => {
    setFilterTitle({
      ...filterstitle,
      [name]: e.target.value});
    // console.log(filterstitle)
  };
  
  // console.log(filteredResults)
  // console.log(filteredTitleResults)
  // console.log(filteredResults)
  // console.log(dataAll)
  return (
    <div className="App">
      <button
        type="button"
        className="btn btn-success ontop"
        onClick={onTop}
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"   
        fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
      </svg>
      </button>
      <div className="rowHandle">
        {sort === 'asc' ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSort('asc')}>sort by createdAt Asc
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSort('desc')}>sort by createdAt Desc
          </button>
        )}
        <div className="input-group mb-3 ">
          <input type="text" className="form-control" placeholder="search" aria-label="Recipient's username" aria-describedby="button-addon2"
          onChange={(e) => searchItems(e.target.value)}
          />
        </div>
        <select className="form-select mb-3 Aligncenter" aria-label="Default select example"
        defaultValue={'DEFAULT'}
        onChange={handleChange('filter')}
        >
          <option value="DEFAULT" disabled>Filter title</option>
            {optionTitle}
        </select>
      </div>
      {isLoading ? (
        <div className="noData">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : isNullOrEmpty(blogs) ? (
        <span className="noData">No Data</span>
      ) : (
        blogs
      )}
      {!isNullOrEmpty(searchInput) || !isNullOrEmpty(filteredTitleResults)  ?  '' : (
        <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
          rowAll={dataAll.length}
        />
      )
      }
    </div>
  );
}


//  get data all
async function getDataBlogsAll() {
  try {
    const res = await axios.get( `${apiRoot}/blogs` );
    // error
    if (res.status !== 200 && res.status !== 201) {
      return null;
    }
    // console.log(res);
    return res.data;
  } catch (error) {
    return null;
  }
}
//get data
async function getDataBlogs(paramString) {
  try {
    let res;
    if (paramString) {
      res = await axios.get(`${apiRoot}/blogs?${paramString}`);
    } else {
      res = await axios.get(`${apiRoot}/blogs`);
    }
    // error
    if (res.status !== 200 && res.status !== 201) {
      return null;
    }
    if (res.status === 429 ) {
      return null;
    }
    // console.log(res);
    return res.data;
  } catch (error) {
    // console.log(error)
    return null;
  }
}
//get data sort
async function getDataBlogsSort(paramString, descOrAsc) {
  // console.log(descOrAsc)
  try {
    const res = await axios.get( `${apiRoot}/blogs?${paramString}&sortBy=createdAt&order=${descOrAsc}` );
    // error
    if (res.status !== 200 && res.status !== 201) {
      return null;
    }
    if (res.status === 429 ) {
      return null;
    }
    // console.log(res);
    return res.data;
  } catch (error) {
    // console.log(error)
    return null;
  }
}