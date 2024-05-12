import './style.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';

const SchedulePicker = ({ schedules, setSchedules }) => {
    const [days, setDays] = useState([
        { name: 'Domingo', checked: false, showSecondTime: false },
        { name: 'Segunda-feira', checked: false, showSecondTime: false },
        { name: 'Terça-feira', checked: false, showSecondTime: false },
        { name: 'Quarta-feira', checked: false, showSecondTime: false },
        { name: 'Quinta-feira', checked: false, showSecondTime: false },
        { name: 'Sexta-feira', checked: false, showSecondTime: false },
        { name: 'Sábado', checked: false, showSecondTime: false }
    ]);

    const [startTimes, setStartTimes] = useState(Array(7).fill(''));
    const [endTimes, setEndTimes] = useState(Array(7).fill(''));
    const [startTimes2, setStartTimes2] = useState(Array(7).fill(''));
    const [endTimes2, setEndTimes2] = useState(Array(7).fill(''));

    useEffect(() => {
        const updatedSchedules = days
            .filter(day => day.checked)
            .map(day => ({
                weekDay: days.indexOf(day), 
                startTime1: startTimes[days.indexOf(day)], 
                endTime1: endTimes[days.indexOf(day)],
                startTime2: day.showSecondTime ? startTimes2[days.indexOf(day)] : '',
                endTime2: day.showSecondTime ? endTimes2[days.indexOf(day)] : '',
            }));
        setSchedules(updatedSchedules);

    }, [days, startTimes, endTimes, startTimes2, endTimes2]);
    

    const handleDayChange = (index) => {
        const updatedDays = [...days];
        updatedDays[index].checked = !updatedDays[index].checked;
        setDays(updatedDays);
    };

    const handleRemoveTime = (index) => {
        const updatedDays = [...days];
        updatedDays[index].showSecondTime = false;
        setDays(updatedDays);
    };

    return (
        <div>
            <h3 className='title'>Horários de Funcionamento</h3>
            {days.map((day, index) => (
                <div key={index} className='schedule-section'>
                    <label className='weekday'>
                        <input
                            className='weekday-checkbox'
                            type="checkbox"
                            checked={day.checked}
                            onChange={() => handleDayChange(index)}
                        />
                        {day.name}
                    </label>
                    {day.checked && (
                        <>
                        <div className='times'>
                            <div className='times-group'>
                                <label>Abre à(s):</label>
                                <input type="time" value={startTimes[index]} onChange={(e) => setStartTimes(prev => [...prev.slice(0, index), e.target.value, ...prev.slice(index + 1)])} />
                            </div>

                            <div className='times-group'>
                                <label>Fecha à(s):</label>
                                <input type="time" value={endTimes[index]} onChange={(e) => setEndTimes(prev => [...prev.slice(0, index), e.target.value, ...prev.slice(index + 1)])} />
                            </div>

                            {!day.showSecondTime && (
                                <div className='button-wrapper'>
                                    <button className='add-button' onClick={() => setDays(prevDays => {
                                        const updatedDays = [...prevDays];
                                        updatedDays[index].showSecondTime = true;
                                        return updatedDays;
                                    })}><FontAwesomeIcon icon={faPlus} /></button>
                                </div>
                            )}
                        </div>
                            {day.showSecondTime && (
                                <>
                                <div className='times'>
                                    <div className='times-group'>
                                        <label>Abre à(s):</label>
                                        <input type="time" value={startTimes2[index]} onChange={(e) => setStartTimes2(prev => [...prev.slice(0, index), e.target.value, ...prev.slice(index + 1)])} />
                                    </div>

                                    <div className='times-group'>
                                        <label>Fecha à(s):</label>
                                        <input type="time" value={endTimes2[index]} onChange={(e) => setEndTimes2(prev => [...prev.slice(0, index), e.target.value, ...prev.slice(index + 1)])} />
                                    </div>

                                    <div className='button-wrapper'>
                                        <button className='remove-button' onClick={() => handleRemoveTime(index)}><FontAwesomeIcon icon={faX} /></button>
                                    </div>
                                </div>
                                    
                                </>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SchedulePicker;
