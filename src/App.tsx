import './App.css';
import { Seat } from '@/components/Seat.tsx';
import { Header } from './components/Header';
import { Aside } from './components/Aside';
import { Nav } from './components/Nav';

import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { fetchEventFx, $event } from './components/api/event';

type DataType = {
    eventId: number,
    namePub: string,
    description: string,
    headerImageUrl: string,
    dateFrom: string,
    dateTo: string
};

type TicketType = {
	id: string,
	name: string,
	price: number
}

type Seat = {
	id: string,
	place: number,
	ticketTypeId: string
}

type SeatRow = {
	row: number,
	seats: Seat[]
}

type EventTicketsResponse = {
	ticketsTypes: TicketType[],
	seats: SeatRow[]
}

function App() {

	useEffect(() => {
		fetchEventFx();
	}, [])

	const event = useUnit($event)

	


	return (
		<div className="flex flex-col grow bg-gray-100 bg-zinc-b text-black">
			
			<Header	userName='Roman Karvatskyi' userEmail='roman.karvatskij@gmail.com' />

			{/* main body (wrapper) */}
			<main className="grow flex flex-col justify-center">
				{/* inner content */}
				<div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
					{/* seating card */}
					<div className="bg-gray-100 rounded-md grow grid p-3 self-stretch shadow-sm" style={{
						gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
						gridAutoRows: '40px'
					}}>
						{/*	seating map */}
						{
							Array.from({ length: 100 }, (_, i) => (
								<Seat key={i} />
							))
						}
					</div>

					<Aside />

				</div>
			</main>

			<Nav totalTickets={0} totalPrice={0} />
		</div>
	);
}

export default App;
