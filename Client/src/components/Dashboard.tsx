"use client";

import { getUserFromLocalStorage } from "@/utils/auth";
import { Snippet } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectUser, userLoggedIn } from "../redux/features/user-slice";
import { AppDispatch } from "../redux/store";
import BikerDashboard from "./BikerDashboard";
import SenderDashboard from "./SenderDashboard";


export default function Dashboard() {
  const user = useSelector(selectUser, shallowEqual);
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      dispatch(userLoggedIn(user));
    }
    setIsLoading(false);
  }, [dispatch]);

  if(loading){
    return 'loading...'
  }


  if (user?.role === "sender") {
    return <SenderDashboard />;
  } else if (user?.role === "biker") {
    return <BikerDashboard />;
  }
  return (
    <div>
      <div>Bikers:</div>
      <div className="flex flex-wrap gap-4">
        <Snippet color="danger">biker1</Snippet>
        <Snippet color="danger">biker2</Snippet>
        <Snippet color="danger">biker3</Snippet>
        <Snippet color="danger">biker4</Snippet>
        <Snippet color="danger">biker5</Snippet>
        <Snippet color="danger">biker6</Snippet>
        <Snippet color="danger">biker7</Snippet>
        <Snippet color="danger">biker8</Snippet>
        <Snippet color="danger">biker9</Snippet>
        <Snippet color="danger">biker10</Snippet>
      </div>

      <div className="pt-[50px]">Senders</div>
      <div className="flex flex-wrap gap-4">
        
        <Snippet color="success">sender1</Snippet>
        <Snippet color="success">sender2</Snippet>
        <Snippet color="success">sender3</Snippet>
        <Snippet color="success">sender4</Snippet>
        <Snippet color="success">sender5</Snippet>
      </div>

      <div className="pt-[50px]">Password for all users</div>
      <div className="flex flex-wrap gap-4">
        <Snippet color="success">password</Snippet>
      </div>
    </div>
  );
}
