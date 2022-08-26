import styles from './SignOptions.module.scss';
import TextInput from '../inputs/TextInput';
import CheckboxExpander from '../inputs/CheckboxExpander';
import Button from '../Button';
import { useEffect, useState } from 'react';

const Options = ({ signOptions }) => {
    let [submitButtonLabel, setSubmitButtonLabel] = useState('Save');
    let [newOptions, setNewOptions] = useState(signOptions);

    function submit(e) {
        setSubmitButtonLabel('Saving...');
        const url = `https://subway-arrivals-staging.herokuapp.com/signinfo/kshf?minArrivalTime=${newOptions.minimum_time}&warnTime=${newOptions.warn_time}&signDirection=${newOptions.direction || ''}&signRotation=${newOptions.rotating}&numArrivals=${newOptions.max_arrivals_to_show}&cycleTime=${newOptions.rotation_time}&autoOff=${newOptions.shutoff_schedule}&autoOffStart=${formatTime(newOptions.turnoff_time)}&autoOffEnd=${formatTime(newOptions.turnon_time)}`;
        console.log(url);
        fetch(url, {method: 'POST'})
        .then(res => res.json())
        .then((payload) => {
            console.log(payload);
            setSubmitButtonLabel('Save');
        })
    }

    function formatTime(time) {
        if (time.length != 8) {
            return time + ":00";
        }
        return time;
    }

    function inputHandler(e) {
        const value = e.target.value;
        const property = e.target.id;
        let changeObject = newOptions;
        changeObject[property] = value;
        console.log(`${property}: ${value}`)
        setNewOptions(changeObject);
        signOptions = newOptions;
    }
    
    function checkboxHandler(e) {
        const value = e.target.checked;
        const property = e.target.id;
        let changeObject = newOptions;

        if (property === 'direction' && value === false) {
            value = '';
        }

        changeObject[property] = value;
        console.log(`${property}: ${value}`)
        setNewOptions(changeObject);
    }

    return (
        <div className={styles['options__container']}>
            <form className={styles.options}>
                <TextInput
                    className={styles.input}
                    id="minimum_time"
                    label="Show arrivals no earlier than..."
                    type="number"
                    value={signOptions.minimum_time}
                    unit="minutes"
                    inputHandler={inputHandler}/>
                <TextInput 
                    className={styles.input}
                    id="warn_time"
                    label="Warn when trains are arriving within..."
                    type="number"
                    value={signOptions.warn_time}
                    unit="minutes"
                    inputHandler={inputHandler}/>
                <CheckboxExpander
                    id="direction"
                    label= "Choose a direction to show"
                    description="The sign will only show trains going in the chosen direction."
                    checked={signOptions.direction !== ""}
                    inputHandler={checkboxHandler}>
                    <fieldset id="direction" onChange={inputHandler} >
                        <label className="checkbox-expander__label" htmlFor="">
                            <input id="direction" type="radio" name="direction" value="N" defaultChecked={(signOptions.direction === 'N')}/>
                            Uptown
                        </label>
                        <label className="checkbox-expander__label" htmlFor="">
                            <input id="direction" type="radio" name="direction" value="S" defaultChecked={(signOptions.direction === 'S')}/>
                            Downtown
                        </label>
                    </fieldset>
                </CheckboxExpander>
                <CheckboxExpander
                    id="rotating"
                    label="Rotate the second row"
                    description="Rotate the arrival shown on the second row of the display, while always showing the next arrival on the first line"
                    checked={signOptions.rotating}
                    inputHandler={checkboxHandler}>

                    <TextInput 
                        className={styles.input}
                        id="max_arrivals_to_show"
                        label="Show up to..."
                        type="number"
                        value={signOptions.max_arrivals_to_show}
                        unit="Arrivals"
                        inputHandler={inputHandler}/>
                    <TextInput 
                        className={styles.input}
                        id="rotation_time"
                        label="Cycle the second row every..."
                        type="number"
                        value={signOptions.rotation_time}
                        unit="seconds"
                        inputHandler={inputHandler}/>

                </CheckboxExpander>
                <CheckboxExpander
                    id="shutoff_schedule"
                    label="Turn the display off automatically"
                    description="Turn the display off between the specified times..."
                    checked={signOptions.shutoff_schedule}
                    inputHandler={checkboxHandler}>
                    <TextInput 
                        className={styles.input}
                        id="turnon_time"
                        label="Turn off at..."
                        type="time"
                        value={signOptions.turnon_time}
                        unit=""
                        inputHandler={inputHandler}/>
                    <TextInput 
                        className={styles.input}
                        id="turnoff_time"
                        label="Turn on at..."
                        type="time"
                        value={signOptions.turnoff_time}
                        unit=""
                        inputHandler={inputHandler}/>

                </CheckboxExpander>
            </form>
            <Button icon="/check.svg" clickHandler={submit} label={ submitButtonLabel } />
        </div>
    )
}

export default Options;