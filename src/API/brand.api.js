export class BrandApi {
    BASE_URL = "http://localhost:3000/";
    BRAND_ENDPOINT = "brand/";

    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    createBrand = async ({ brand_name, transaction_type, total_orders, total_order_value, gross_margin_percentage }) => {
        const body = { brand_name, transaction_type, total_orders, total_order_value, gross_margin_percentage };
        console.log(body, '<<<');
        const response = await fetch(this.BASE_URL + this.BRAND_ENDPOINT, { body: JSON.stringify(body), method: 'POST', headers: this.headers });
        return response;
    }

    updateBrand = async ({ brandId, brand_name, transaction_type, total_orders, total_order_value, gross_margin_percentage }) => {
        const body = { brand_name, transaction_type, total_orders, total_order_value, gross_margin_percentage };
        const response = await fetch(this.BASE_URL + this.BRAND_ENDPOINT + `${brandId}`, { body: JSON.stringify(body), method: 'POST', headers: this.headers });
        return response;
    }

    deleteBrand = async ({ brandId }) => {
        const response = await fetch(this.BASE_URL + this.BRAND_ENDPOINT + `${brandId}`, { method: 'DELETE' });
        return response;
    }

    getAllBrands = async () => {
        const response = await fetch(this.BASE_URL + this.BRAND_ENDPOINT, { method: 'GET' });
        return response;
    }

    getBrandById = async (brandId) => {
        const response = await fetch(this.BASE_URL + this.BRAND_ENDPOINT + `${brandId}`, { method: 'GET' });
        return response;
    }
}