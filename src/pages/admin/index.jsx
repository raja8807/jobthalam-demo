import AdminScreen from "@/components/screens/admin/admin";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AdminPage = ({ session }) => {


  if(!session){
    return <LoadingScreen/>
  }

  return <AdminScreen session={session} />;
};

export default AdminPage;
