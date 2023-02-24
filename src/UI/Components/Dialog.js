import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Input, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BrandApi } from '../../API/brand.api';

function CustomAlertDialog({ label, addBrandSale }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [brand, setBrand] = useState(undefined);
    const [transactionType, setTransactionType] = useState(undefined);
    const [totalOrders, setTotalOrders] = useState(undefined);
    const [totalOrderValue, setTotalOrderValue] = useState(undefined);
    const [grossMarginPercentage, setGrossMarginPercentage] = useState(undefined);


    const [isBrandInvalid, setIsBrandInvalid] = useState(false);
    const [isTransactionTypeInvalid, setIsTransactionTypeInvalid] = useState(false);
    const [isTotalOrdersInvalid, setIsTotalOrdersInvalid] = useState(false);
    const [isTotalOrderValueInvalid, setIsTotalOrderValueInvalid] = useState(false);
    const [isGrossMarginPercentageInvalid, setIsGrossMarginPercentageInvalid] = useState(false);

    const onSubmit = () => {
        // validate();
        // if (canSubmit()) {
        const brandApi = new BrandApi();
        brandApi.createBrand({
            brand_name: brand,
            transaction_type: transactionType,
            total_orders: totalOrders,
            total_order_value: totalOrderValue,
            gross_margin_percentage: grossMarginPercentage
        }).then((response) => {
            if (response.ok) {
                onClose();
                resetFieldValues();
            }
            else {
                alert("Error has occured");
            }
        });
        addBrandSale({ brand_name: brand, transaction_type: transactionType, total_orders: totalOrders, total_order_value: totalOrderValue, gross_margin_percentage: grossMarginPercentage });
        // }
    }

    const validate = () => {
        setIsBrandInvalid(brand === undefined || brand === "");
        setIsTransactionTypeInvalid(transactionType === undefined || transactionType === "");
        setIsTotalOrdersInvalid(totalOrders === undefined);
        setIsTotalOrderValueInvalid(totalOrderValue === undefined);
        setIsGrossMarginPercentageInvalid(grossMarginPercentage === undefined);
    }

    const canSubmit = () => {
        return !isBrandInvalid && !isTransactionTypeInvalid && !isTotalOrderValueInvalid && !isTotalOrdersInvalid && !isGrossMarginPercentageInvalid;
    }

    const resetFieldValues = () => {
        setBrand(undefined);
        setTransactionType(undefined);
        setTotalOrders(undefined);
        setTotalOrderValue(undefined);
        setGrossMarginPercentage(undefined);
    }

    return (
        <>
            <Button colorScheme='blue' onClick={onOpen}>
                {label}
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Add New Brand Sale
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Input placeholder='Brand Name' type={'text'} style={inputStyle} onChange={(val) => { setBrand(val.target.value) }} isInvalid={isBrandInvalid} errorBorderColor='crimson'></Input>
                                <Input placeholder='Transaction Type' type={'text'} style={inputStyle} onChange={(val) => { setTransactionType(val.target.value) }} isInvalid={isTransactionTypeInvalid} errorBorderColor='crimson'></Input>
                                <Input placeholder='Total Orders' type={'number'} style={inputStyle} onChange={(val) => { setTotalOrders(Number(val.target.value)) }} isInvalid={isTotalOrdersInvalid} errorBorderColor='crimson'></Input>
                                <Input placeholder='Total Order Value' type={'number'} style={inputStyle} onChange={(val) => { setTotalOrderValue(Number(val.target.value)) }} isInvalid={isTotalOrderValueInvalid} errorBorderColor='crimson'></Input>
                                <Input placeholder='Gross Margin Percentage' type={'number'} style={inputStyle} onChange={(val) => { setGrossMarginPercentage(Number(val.target.value)) }} isInvalid={isGrossMarginPercentageInvalid} errorBorderColor='crimson'></Input>
                            </div>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='blue' onClick={onSubmit} ml={3}>
                                Add
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

const inputStyle = {
    margin: '5px'
};

export default CustomAlertDialog;