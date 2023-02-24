import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons';
import { BrandApi } from '../../API/brand.api';

function CustomTable({ headers, rows, deleteByIndex }) {

    const brandApi = new BrandApi();

    return (
        <TableContainer border={'1px'}>
            <Table>
                <Thead style={{ backgroundColor: 'black', color: 'white', height: '50px' }}>
                    <Tr>
                        {
                            headers.map((head) => {
                                return <Th>{head}</Th>
                            })
                        }
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        rows.map((row, index) => {
                            return <Tr key={index}>
                                <Td>{row.brand_name}</Td>
                                <Td>{row.transaction_type}</Td>
                                <Td>{row.total_orders}</Td>
                                <Td>{row.total_order_value}</Td>
                                <Td>{row.gross_margin_percentage}</Td>
                                <Td onClick={() => { deleteByIndex(index) }}><DeleteIcon /></Td>
                            </Tr>
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default CustomTable;