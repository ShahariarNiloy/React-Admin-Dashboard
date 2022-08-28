import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../dataTableSourceData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import "./DataTableStyle.scss";
import { db } from "../../firebase/firebaseConfig";

const DataTable = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    // LISTEN (REALTIME)
    const unSub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list: any = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unSub();
    };
  }, []);

  const handleDelete = async (id: any) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item: any) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
