<script lang="ts">
    const DEFAULT_CITY = 'Boedo';
    const DEFAULT_TEMPERATURE_UNIT = 'C';
    let city = DEFAULT_CITY;
    let temperatureUnit = DEFAULT_TEMPERATURE_UNIT;

    async function fetchWeather(city: string = DEFAULT_CITY) {
        return await fetch(`/api/weather?q=${city}`).then(response => response.json());
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            city = (event.target as HTMLInputElement).value;
        }
    }

    function backgroundByDay(weather: any) {
        return weather.is_day ? 'day day-color' : 'night night-color'
    }

    function colorByDay(weather: any) {
        return weather.is_day ? 'day-color' : 'night-color'
    }

    $: weatherPromise = fetchWeather(city);
</script>

<style>
    :global(body) {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .panel {
        aspect-ratio: 16 / 9;
        width: 500px;
        max-width: 100%;
        display: block;
        box-shadow: 20px 20px 10px 5px rgba(0, 0, 0, 0.5);
        background-color: #f0f0f0;
        padding: 30px;
        border-radius: 20px;
        color: #000000;
    }

    .day {
        background: linear-gradient(45deg, #206aca, #63a6d3);
    }
    .day-color {
        color: #09070f;
    }

    .night {
        background: linear-gradient(45deg, #330c66, #090016);
    }
    .night-color {
        color: #c8c8c8;
    }

    .weather-container {
        display: grid;
        grid-template-columns: 1.5fr 2fr;
        gap: 20px;
        grid-auto-rows: minmax(100px, auto);
    }

    h2 {
        font-weight: 600;
    }

    h3 {
        font-weight: 300;
    }

    h4 {
        font-weight: 400;
    }

    .temperature-container {
        grid-column: 1;
        grid-row: 1;
        text-align: left;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 110px;
    }

    .temperature-number {
        font-size: 6.5em;
    }

    .location-container {
        grid-column: 2;
        grid-row: 1;
    }

    .location {
        margin: -10px 0px -20px 0px;
        font-weight: 200;
    }

    .button-temperature-unit {
        background-color: transparent;
        border: none;
        margin: 0px 0px 50px 0px;
        font-size: 1.5em;
        font-weight: 300;
        cursor:pointer;
    }

    .city-input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #888888;
        width: 100%;
        margin: 20px 0px 0px 0px;
        font-weight: 400;
        font-size: 2em;
        text-transform: uppercase;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .condition {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin: 0px 0px 0px 0px;
    }

    .icon {
        margin: 0px 10px 0px 0px;
    }

    .column {
        grid-row: 2;
        line-height: 0.001;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        font-size: 0.9em;
    }
    .first {
        grid-column: 1;
    }
    .second {
        grid-column: 2;
    }

    .right {
        text-align: right;
    }
    .left {
        text-align: left;
    }

    .item {
        grid-column: 1;
        text-align: right;
    }
    .value {
        grid-column: 2;
        text-align: left;
    }
    .value>span>h4 {
        font-weight: 100;
    }
</style>

{#await weatherPromise}
<div class="panel">
    <p>Loading...</p>
</div>
{:then weather}
<div class="panel {backgroundByDay(weather)}">
    <div class="weather-container">
        <div class="temperature-container">
            <h2 class="temperature-number {colorByDay(weather)}">
                {temperatureUnit === 'C' ? weather.temperature_celsius : weather.temperature_fahrenheit}
            </h2>
            <button
                class="button-temperature-unit {colorByDay(weather)}"
                on:click={() => temperatureUnit = temperatureUnit === 'C' ? 'F' : 'C'}
            >
                º{temperatureUnit}
            </button>
        </div>
        <div class="location-container right">
            <div class="location">
                <input
                    class="city-input right {colorByDay(weather)}"
                    type="text"
                    placeholder="City"
                    value={city}
                    on:keypress={handleKeyPress}
                />
            </div>
            <div class="location">
                <h4>{weather.region} - {weather.country}</h4>
            </div>
            <div class="condition">
                <img class="icon" src={weather.icon} alt={weather.condition} />
                <h3>{weather.condition}</h3>
            </div>
        </div>
        <div class="column first left">
            <div class="item">
                <strong><h4>Feels like:</h4></strong>
                <strong><h4>Humidity:</h4></strong>
                <strong><h4>Pressure:</h4></strong>
                <strong><h4>Wind:</h4></strong>
                <strong><h4>Visibility:</h4></strong>
                <strong><h4>UV:</h4></strong>
            </div>
            <div class="value">
                <span><h4>{temperatureUnit === 'C' ? weather.feelslike_celsius : weather.feelslike_fahrenheit} º{temperatureUnit}</h4></span>
                <span><h4>{weather.humidity} %</h4></span>
                <span><h4>{weather.pressure_mb} mb</h4></span>
                <span><h4>{weather.wind_kph} kph {weather.wind_direction}</h4></span>
                <span><h4>{weather.visibility_km} km</h4></span>
                <span><h4>{weather.uv}</h4></span>
            </div>
        </div>
        <div class="column second right">
            <div class="item">
                <strong><h4>Local time:</h4></strong>
                <strong><h4>Last updated:</h4></strong>
            </div>
            <div class="value">
                <span><h4>{weather.localtime}</h4></span>
                <span><h4>{weather.last_updated}</h4></span>
            </div>
        </div>
    </div>
</div>
{:catch error}
<div class="panel">
    <p>Error: {error.message}</p>
</div>
{/await}
