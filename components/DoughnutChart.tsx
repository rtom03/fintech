

"use client"

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart =
    ({ accounts }: DoughnutChartProps) => {
        const accountNames = accounts.map((a) => a.name);
        const balances = accounts.map((a) => a.currentBalance)
        const data = {
            datasets: [
                {
                    label: 'Banks',
                    data: balances,
                    backgroundColor: ['#074766', '#2265d8', '#2f91fa']
                }
            ],
            labels: ['Banks 1', 'Bank 2', 'Bank 3']
        }
        return <Doughnut
            data={data}
            options={{
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }}
        />
    }

export default DoughnutChart