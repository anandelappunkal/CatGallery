import React, { useState } from 'react';
import { determineBilling, Member, MemberBillingInfo } from '../services/billingService';
import './BillingButton.css'; // Import the CSS file

const BillingButton: React.FC<{ members: Member[] }> = ({ members }) => {
  const [billingInfo, setBillingInfo] = useState<MemberBillingInfo[]>([]);

  const handleClick = () => {
    try {
      const info = determineBilling(members);
      setBillingInfo(info);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="billing-container">
      <button className="billing-button" onClick={handleClick}>Determine Billing</button>
      <div>
        {billingInfo.map(info => (
          <div key={info.memberId}>
            <h3>Member ID: {info.memberId}</h3>
            <p>Dependent Children: {info.dependentChildren.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingButton;
