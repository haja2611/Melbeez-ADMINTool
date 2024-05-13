import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from '../../_metronic/_helpers';
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Cookie from "js-cookie";


function TablePagination({
  keyField,
  data,
  columns,
  isGrantAccessComponent,
  saveChanges,
  isPaginationShow,
  getRecordList,
  selectRow,
  getRecordListParams,
  isShowExportCsv = true,
  status,
}) {
  const defaultSorted = [
    {
      dataField:
        keyField === 'Id'
          ? 'Id'
          : keyField === undefined
          ? 'Id'
          : 'PublisherGroupId',
      order: 'asc',
    },
  ];
  const { ExportCSVButton } = CSVExport;
  const { SearchBar } = Search;
  const [resultSet, setResultSet] = useState(data || []);
  const [totalSize, setTotalSize] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(5);
  const [getName, setName] = useState(Cookie.get("exclname"))


  const adminObj = useSelector((state) => state.adminDataObj?.adminObj) || 0;
  const userBlockObj =
    useSelector((state) => state.blockUserDataObj?.UserObj) || 0;
  const productCategoryObj =
    useSelector((state) => state.CategoryProductObj?.CategoryObj) || 0;
  const verifyUserCredObj =
    useSelector((state) => state.ConfirmUserObjred.confirmUserObj) || 0;
  const returnDataListFucn = async (currentIndex, sizePerPage) => {
    if (getRecordListParams) {
      return await getRecordList(
        getRecordListParams,
        currentIndex,
        sizePerPage,
      );
    } else {
      return await getRecordList(currentIndex, sizePerPage, status);
    }
  };

  const handleTableChange = async (type, { page, sizePerPage }) => {
    const currentIndex = (page - 1) * sizePerPage;
    await returnDataListFucn(currentIndex, sizePerPage, status)
      .then((data) => {
        return data.json();
      })
      .then((result) => {
        let response = result.result;
        setResultSet(response);
        setTotalSize(result.pageDetail.count);
        setPage(page);
        setOffset(sizePerPage);
      })
      .catch((error) => {});
    setLoader(false);
  };

  useEffect(() => {
    setLoader(true);
    handleTableChange('pagination', { page: page, sizePerPage: 10 });
    Cookie.remove("searchText");
    Cookie.remove("filterValue");
    Cookie.remove("dateforsearch");
    Cookie.remove("date2forsearch");
  }, []);

  useEffect(() => {
    if (adminObj || userBlockObj || productCategoryObj || verifyUserCredObj) {
      setLoader(true);
      handleTableChange('pagination', { page: 1, sizePerPage: 10 });
    }
  }, [adminObj, userBlockObj, productCategoryObj, verifyUserCredObj]);

  const TextFormatter = () => {
    return <p className="text-center text-danger">No Data Found!!</p>
  }

  return (
    <div>
      {loader ? (
        <div style={{ textAlign: 'center' }}>
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <ToolkitProvider
          keyField={keyField}
          data={resultSet ?? []}
          columns={columns}
          search
          exportCSV={{
            fileName: getName,
          }}
        >
          {(props) => (
            <div>
              { isShowExportCsv &&
               <ExportCSVButton {...props.csvProps} className="text-dark btn btn-primary" title='Excel Download'><i className="fa fa-file-excel" aria-hidden="true"></i></ExportCSVButton>
              }              
              <BootstrapTable
                {...props.baseProps}
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                hover={true}
                defaultSorted={defaultSorted}
                onTableChange={handleTableChange}
                remote

                pagination={paginationFactory({
                  sizePerPage: data,
                  totalSize: totalSize,
                  page: page,
                })}
                filter={filterFactory()}
                noDataIndication={TextFormatter}
                selectRow={selectRow}
              >
                <PleaseWaitMessage entities={data} />
                <NoRecordsFoundMessage entities={data} />
              </BootstrapTable>
            </div>
          )}
        </ToolkitProvider>
      )}

      <div className="mb-5" style={{ display: 'flex', alignItems: 'center' }}>
        {isGrantAccessComponent !== undefined && isGrantAccessComponent ? (
          <div style={{ position: 'absolute', right: 25 }}>
            <Button onClick={saveChanges} className="btn btn-primary">
              Save
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TablePagination;
