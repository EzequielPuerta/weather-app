import { json } from '@sveltejs/kit';
import { RAPID_API_KEY, RAPID_API_HOST } from '$env/static/private';

const GET_OPTIONS = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST
    }
};

export async function GET(event: any) {
    const query = event.url.searchParams.get('q');
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${query}`;

    const response = await fetch(url, GET_OPTIONS);
    const body = await response.json();
    const { name, region, country, localtime } = body.location;
    const { 
        last_updated,
        temp_c,
        temp_f,
        is_day,
        wind_mph,
        wind_kph,
        wind_degree,
        wind_dir,
        pressure_mb,
        pressure_in,
        precip_mm,
        precip_in,
        humidity,
        cloud,
        feelslike_c,
        feelslike_f,
        vis_km,
        vis_miles,
        uv
    } = body.current;
    const { text, icon } = body.current.condition;
    
    const weather = {
        city: name,
        region,
        country,
        localtime,
        last_updated,
        temperature_celsius: temp_c,
        temperature_fahrenheit: temp_f,
        is_day,
        wind_mph,
        wind_kph,
        wind_degree,
        wind_direction: wind_dir,
        pressure_mb,
        pressure_in,
        precipitation_mm: precip_mm,
        precipitation_in: precip_in,
        humidity,
        cloud,
        feelslike_celsius: feelslike_c,
        feelslike_fahrenheit: feelslike_f,
        visibility_km: vis_km,
        visibility_miles: vis_miles,
        uv,
        condition: text,
        icon
    }
    return json(weather);
}