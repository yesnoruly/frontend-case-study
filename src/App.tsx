// Styles
import './App.css';

// Components
import { Seat } from '@/components/Seat.tsx';
import { Header } from './components/Header';
import { Aside } from './components/Aside';
import { Nav } from './components/Nav';
import { GridSkeleton } from './components/ui/grid-skeleton.tsx';

// Stores
import { $tickets } from '@/components/model/tickets.ts';
import { $cart } from './components/model/cart.ts'

// Types
import type { TSeat, TTicketsResponse } from './components/api/fetchTickets.ts';

// Tools
import { useUnit } from 'effector-react';

type TGridSeat = {
	place: number,
	status: 'available' | 'taken',
	seatData?: void | TSeat | undefined;
}

type TGridRow = {
	seatRow: number,
	seats: TGridSeat[]
}

function App() {

	// connecting effector stores with react
	const tickets = useUnit($tickets);
	
	const cart = useUnit($cart);

	// Finding empty cells in grid and adding to them 'taken' status
	function buildRowMap(seats: TSeat[], maxSeats: number): TGridSeat[] {
		const existingMap = new Map(seats.map(seat => [seat.place, seat]))

		return Array.from({ length: maxSeats }, (_, i) => {
			const place = i + 1;
			const existingSeat = existingMap.get(place)

			return existingSeat
				? { place, status: 'available' as const, seatData: existingSeat }
				: { place, status: 'taken' as const }
		})
	}

	function buildGrid(tickets: TTicketsResponse) {

		const max_seats_in_row = Math.max(...tickets.seatRows.flatMap(row => row.seats.map(s => s.place)), 0)

		return tickets.seatRows.map(row => ({
			seatRow: row.seatRow,
			seats: buildRowMap(row.seats, max_seats_in_row)
		}))
	}

	const grid: TGridRow[] = tickets ? buildGrid(tickets) : [];

	return (
		<div className="flex flex-col grow bg-gray-100 bg-zinc-b text-black">

			<Header />

			{/* main body (wrapper) */}
			<main className="grow flex flex-col justify-center">
				{/* inner content */}
				<div className="max-w-screen-lg mx-auto flex [@media(max-width:768px)]:flex-col-reverse items-center px-2.5 gap-3 w-full">
					{/* seating card */}
					<div className="bg-gray-100 rounded-md grow self-stretch shadow-sm overflow-x-auto">
						{/*	seating map */}
						{
							grid.length
								? grid.map((row, rowIndex) => (
									<div key={rowIndex} className="flex items-center justify-center gap-2 mb-2 min-w-max [@media(max-width:768px)]:gap-0.5">
										{
											row.seats?.map((seat, seatIndex) => {
												return <Seat
													seatId={seat.seatData?.seatId}
													ticketTypeId={seat.seatData?.ticketTypeId}
													key={`${rowIndex}-${seatIndex}`}
													row={row.seatRow}
													place={seat.place}
													status={seat.status}
													className={`w-8 h-8 rounded flex items-center justify-center text-xs
													}`}
												/>
											})
										}
									</div>
								))
								: <GridSkeleton />

						}

						<div className="flex-grow-1">
							<p className='text-sm text-zinc-500'>
								[ ] - Regular ticket
							</p>
							<p className="text-sm text-zinc-500">
								[V] - VIP Ticket
							</p>
						</div>
					</div>

					<Aside className='grow' />

				</div>
			</main>

			<Nav totalTickets={cart.quantity} totalPrice={cart.totalPrice} />
		</div>
	);
}

export default App;
