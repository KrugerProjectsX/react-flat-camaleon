import React from 'react'
import FlatForm from '../components/FlatForm';
import {useParams} from "react-router-dom";
import Header from "../components/Header";
export default function FlatUpdate() {
    let { flatId }  = useParams();
    if (flatId === undefined) {
        flatId = null;
    
    }
  return (
    <>
        <Header/>
        <div>Flat Update</div>
        <FlatForm type={'update'} userId={flatId}/>
    </>
    
  )
}
