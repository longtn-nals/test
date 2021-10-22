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
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [sort, setSort] = useState ('asc');
  const [dataAll, setDataAll] = useState ([]);
  const [filtersTitle, setFilterTitle] = useState (null)
  const [
    filteredTitleResults, 
    setFilteredTitleResults] = useState([]);
  useEffect(() => {

    async function getDataBlogAll() {
      // call api get data
      const result = await getDataBlogsAll();
      // faild
      if (!result) return;
  
      // success
      setDataAll(result);
    }
    async function getData() {
      if (isNullOrUndefined(filters)) return;
      const paramStringPaging = queryString.stringify(filters);
      // show loading
      setisLoading(true);
      // call api get data
      const result = await getDataBlogs(paramStringPaging, sort)
      // faild
      if (!result) return;
      // hide loading
      setisLoading(false);
      //succes
      setData(result);
      setPagination(filters);
      // console.log(result)
    }
    async function search() {
      const paramStringPaging = queryString.stringify(filters);
      // show loading
      setisLoading(true);
      // call api get data
      const result = await getDataSearch(paramStringPaging, sort, searchInput)
      // faild
      if (!result) return;
      
      // hide loading
      setisLoading(false);
      setFilteredSearch(result)
    }

    async function getDataFilter() {
      const paramStringPaging = queryString.stringify(filters);
      // show loading
      setisLoading(true);
      // call api get data
      const result = await callApiGetDataFilter(paramStringPaging, sort, filtersTitle)
      // faild
      if (!result) return;
      
      // hide loading
      setisLoading(false);
      setFilteredTitleResults(result)
    }
    
    getDataBlogAll();
    getData();
    search();
    getDataFilter();
  }, [filters, filtersTitle, sort, searchInput]);

  const onTop = () => {
    window.scrollTo(0, 0)
  }

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
  }
  const handlePageChange = (newPage) => {
    setFilter({
      ...filters,
      page: newPage,
    })
  };
// render books
const blogs = [];
!isNullOrEmpty(filtersTitle) ? (
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
  !isNullOrUndefined(searchInput) ? (
  filteredSearch.map((row, i) => {
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
    )}))
  
  const handleSort = async (flag) => {
    // console.log(flag)
    if (!isNullOrUndefined(flag) && flag === 'asc') {
      setSort('desc')
    } else if (!isNullOrUndefined(flag) && flag === 'desc') {
      setSort('asc')
    }
    // console.log(sort)
  }
  // rending option title
  const optionTitle = []
  !isNullOrEmpty(searchInput) ? (
    filteredSearch.map(e => {
    optionTitle.push (
      <option value={e.title} key={e.id}>
        {e.title}
      </option>
    );
  })) : (
  dataAll.map(e => {
    optionTitle.push (
      <option value={e.title} key={e.id}>
        {e.title}
      </option>
    );
  }))
  const handleChange = e => {
    let val = e.target.value;
    setFilterTitle(val);
  };

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
            onClick={() => handleSort('asc')}>sort by createdAt Desc
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSort('desc')}>sort by createdAt Asc
          </button>
        )}
        <div className="input-group mb-3 ">
          <input type="text" className="form-control" placeholder="search" aria-label="Recipient's username" aria-describedby="button-addon2"
          onChange={(e) => searchItems(e.target.value)}
          />
        </div>
        <select className="form-select mb-3 Aligncenter" aria-label="Default select example"
        defaultValue={''}
        onChange={handleChange}
        >
          <option value='' >Filter title</option>
            {optionTitle}
        </select>
      </div>
      {isLoading ? (
        <div className="noData">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : isNullOrEmpty(blogs) && isNullOrEmpty(filteredSearch) ? (
        <span className="noData">No Data</span>
      ) : (
        blogs
      )}
      {!isNullOrUndefined(searchInput) || !filteredSearch || !isNullOrUndefined(filtersTitle)  ?  '' : (
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
async function getDataBlogs(paramStringPaging, sort) {
  let url = `${apiRoot}/blogs?${paramStringPaging}`;
  if (sort === 'desc') {
    url = `${apiRoot}/blogs?${paramStringPaging}&sortBy=createdAt&order=${sort}`;
  }
  try {
    const res = await axios.get( url );
    // error
    if (res.status !== 200 && res.status !== 201) {
      return null;
    }
    if (res.status === 429 ) {
      return null;
    }
    return res.data;
  } catch (error) {
    // console.log(error)
    return null;
  }
}
// search=z&filter=Books%20Shores%20AGP&sortBy=createdAt&order=asc
//get data search & filter
async function getDataSearch(paramStringPaging, sort, searchInput) {
  let url = `${apiRoot}/blogs?search=${searchInput}&sortBy=createdAt&order=${sort}`;
    if (searchInput === '') {
      url = `${apiRoot}/blogs?${paramStringPaging}&sortBy=createdAt&order=${sort}`;
    }
    try {
      const res = await axios.get( url );
      // error
      if (res.status !== 200 && res.status !== 201) {
        return null;
      }
      if (res.status === 429 ) {
        return null;
      }
      return res.data;
    } catch (error) {
      // console.log(error)
      return null;
  }
}
//get data search & filter
async function callApiGetDataFilter(paramStringPaging, sort, filterstitle) {
  let url = `${apiRoot}/blogs?${paramStringPaging}&sortBy=createdAt&order=${sort}`;
    if (filterstitle !== '') {
      url = `${apiRoot}/blogs?filter=${filterstitle}&sortBy=createdAt&order=${sort}`;
    }
    try {
      const res = await axios.get( url );
      // error
      if (res.status !== 200 && res.status !== 201) {
        return null;
      }
      if (res.status === 429 ) {
        return null;
      }
      return res.data;
    } catch (error) {
      // console.log(error)
      return null;
  }
}