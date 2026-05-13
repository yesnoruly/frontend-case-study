import './App.css';
import { Seat } from '@/components/Seat.tsx';
import { Header } from './components/Header';
import { Aside } from './components/Aside';
import { Nav } from './components/Nav';

import { useUnit } from 'effector-react';

import { $tickets } from './components/api/tickets.ts';
import type { Seat as SeatType, TicketsResponse as TicketsResponseType } from './components/api/tickets.ts';

type GridSeat = {
	place: number,
	status: 'available' | 'taken',
	seatData?: void | SeatType | undefined;
}

type GridRow = {
	seatRow: number,
	seats: GridSeat[]
}

function App() {

	const tickets = useUnit($tickets);

	function buildRowMap(seats: SeatType[], maxSeats: number): GridSeat[] {
		const existingMap = new Map(seats.map(seat => [seat.place, seat]))

		return Array.from({ length: maxSeats }, (_, i) => {
			const place = i + 1;
			const existingSeat = existingMap.get(place)

			return existingSeat
				? { place, status: 'available' as const, seatData: existingSeat }
				: { place, status: 'taken' as const }
		})
	}

	function buildGrid(tickets: TicketsResponseType): GridRow[] {

		const max_seats_in_row = Math.max(...tickets.seatRows.flatMap(row => row.seats.map(s => s.place)), 0)

		return tickets.seatRows.map(row => ({
			seatRow: row.seatRow,
			seats: buildRowMap(row.seats, max_seats_in_row)
		}))
	}

	const grid: GridRow[] = tickets ? buildGrid(tickets) : [];

	return (
		<div className="flex flex-col grow bg-gray-100 bg-zinc-b text-black">

			<Header userName='Roman Karvatskyi' userEmail='roman.karvatskij@gmail.com' />

			{/* main body (wrapper) */}
			<main className="grow flex flex-col justify-center">
				{/* inner content */}
				<div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
					{/* seating card */}
					<div className="bg-gray-100 rounded-md grow self-stretch shadow-sm" style={{}}>
						{/*	seating map */}
						{
							grid
								? grid.map((row, rowIndex) => {
									return <div key={rowIndex} className="flex items-center justify-center gap-2 mb-2">
										{
											row.seats?.map((seat, seatIndex) => {
												return <Seat
													key={`${rowIndex}-${seatIndex}`}
													place={seat.place}
													className={`w-8 h-8 rounded flex items-center justify-center text-xs ${seat.status === 'taken' ? ' bg-gray-300 hover:bg-slate-500 text-white cursor-text' : 'text-gray-600 cursor-pointer'
														}`}
												/>
											})
										}
									</div>
								})
								:
								<div className="flex flex-col gap-2 p-4">
									{[1, 2, 3, 4].map(i => (
										<div key={i} className="flex justify-center gap-2">
											{[1, 2, 3, 4, 5, 6, 7, 8].map(j => (
												<div
													key={j}
													className="w-8 h-8 rounded bg-gray-200 animate-pulse"
												/>
											))}
										</div>
									))}
								</div>
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
