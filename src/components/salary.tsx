// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Select } from '@/components/ui/select';

// const SalaryConverter = () => {
//     const [salary, setSalary] = useState(0);
//     const [payPeriod, setPayPeriod] = useState('monthly');
//     const [hoursPerWeek, setHoursPerWeek] = useState(40);

//     const calculateSalary = (period) => {
//         switch (period) {
//             case 'annual':
//                 return salary;
//             case 'monthly':
//                 return salary / 12;
//             case 'biweekly':
//                 return (salary / 12) * 26 / 52;
//             case 'weekly':
//                 return (salary / 12) / 4;
//             case 'daily':
//                 return (salary / 12) / 30 / 8;
//             case 'hourly':
//                 return (salary / 12) / 30 / 8 / hoursPerWeek;
//             default:
//                 return 0;
//         }
//     };

//     return (
//         <Card className="w-full max-w-md">
//             <CardHeader>
//                 <CardTitle>Salary Conversion</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="space-y-4">
//                     <div>
//                         <Label htmlFor="salary">Salary</Label>
//                         <Input
//                             id="salary"
//                             type="number"
//                             min="0"
//                             value={salary}
//                             onChange={(e) => setSalary(parseFloat(e.target.value))}
//                         />
//                     </div>
//                     <div>
//                         <Label htmlFor="pay-period">Pay Period</Label>
//                         <Select
//                             id="pay-period"
//                             value={payPeriod}
//                             onChange={(e) => setPayPeriod(e.target.value)}
//                         >
//                             <option value="annual">Annual</option>
//                             <option value="monthly">Monthly</option>
//                             <option value="biweekly">Biweekly</option>
//                             <option value="weekly">Weekly</option>
//                             <option value="daily">Daily</option>
//                             <option value="hourly">Hourly</option>
//                         </Select>
//                     </div>
//                     {payPeriod === 'hourly' && (
//                         <div>
//                             <Label htmlFor="hours-per-week">Hours per Week</Label>
//                             <Input
//                                 id="hours-per-week"
//                                 type="number"
//                                 min="1"
//                                 value={hoursPerWeek}
//                                 onChange={(e) => setHoursPerWeek(parseFloat(e.target.value))}
//                             />
//                         </div>
//                     )}
//                 </div>
//             </CardContent>
//             <CardFooter>
//                 <div className="text-2xl font-bold">
//                     {payPeriod === 'hourly'
//                         ? `${calculateSalary(payPeriod).toFixed(2)}/hour`
//                         : `${calculateSalary(payPeriod).toLocaleString('en-US', {
//                             style: 'currency',
//                             currency: 'USD',
//                         })}`}
//                 </div>
//             </CardFooter>
//         </Card>
//     );
// };

// export default SalaryConverter;