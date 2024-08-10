import React from 'react';
import LogoutButton from './LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import { allocateBudget } from '../action';


function FinanceDashboard() {
  const complaints = useSelector((state) => state.user.complaints);
  const [selectedComplaint, setSelectedComplaint] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();

  const handleAllocate = () => {
    if (selectedComplaint && amount) {
      dispatch(allocateBudget(selectedComplaint, amount));
      setSelectedComplaint('');
      setAmount('');
      alert(`Allocated ${amount} to complaint number ${selectedComplaint}`);
    }
  };
  return (
    <div className='Dashboard'>
      <h1>This is the Finance Manager Dashboard</h1>

      {/* Add additional Finance-specific content here */}
      <LogoutButton/>
    </div>
  );
}

export default FinanceDashboard;
