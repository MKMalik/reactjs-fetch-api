import CustomTable from "../Components/Table";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import CustomAlertDialog from "../Components/Dialog";
import { BrandApi } from "../../API/brand.api";

function Brand() {
    const brandApi = new BrandApi();
    useEffect(() => {
        brandApi.getAllBrands().then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log(data);
                    setRows(data);
                });
            }
        });
    }, [])

    let headers = ['Brand', 'Transaction Type', 'Total Orders', 'Total Order Value', 'Gross Margin Percentage', 'Action'];
    let [rows, setRows] = useState(
        [
            // { brand: 'HYUNDAI', transaction_type: 'Trading', total_orders: 1, total_order_value: 18105, gross_margin_percentage: 10.83 },
        ]
    );

    const deleteByIndex = (index) => {
        if (index === 0) {
            setRows([]);
        }
        else {
            rows.splice(index, 1);
            setRows([...rows])
        }
        brandApi.deleteBrand({ brandId: rows[index]["_id"] })
    }
    const addBrandSale = (data) => {
        setRows(rows => [...rows, data]);
    }
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div style={{ padding: '20px' }}>
            {/* Select Date and + Add Brand Sales Button */}
            <div style={{ display: "flex", flexDirection: "row" }}>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd-MM-yy" />
                <CustomAlertDialog label={'Add Brand Sale'} addBrandSale={addBrandSale} />
            </div>
            <CustomTable headers={headers} rows={rows} deleteByIndex={deleteByIndex} />
        </div>
    );
}

export default Brand;