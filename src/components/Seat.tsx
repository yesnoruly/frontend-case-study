import { Button } from '@/components/ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';
import React from 'react';

import { useUnit } from 'effector-react';

import { $vipTicketTypeId, $ticketPrice } from './api/tickets.ts';

type SeatProps = {
	place?: number,
	row?: number,
	className?: string,
	status: 'available' | 'taken',
	ticketTypeId?: string,
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>((props, ref) => {
	const isInCart = false;

	const vipTicketTypeId = useUnit($vipTicketTypeId);

	const ticketPrice = useUnit($ticketPrice);

	const isVip = props.ticketTypeId === vipTicketTypeId;

	return (
		<Popover>
			<PopoverTrigger>
				<div className={cn('size-8 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-color', props.className)} ref={ref}>
					<span className="text-xs text-zinc-400 font-medium">{isVip ? '[V]' : '[ ]'}</span>
				</div>
			</PopoverTrigger>

			<PopoverContent>
				<p>Row: {props.row}</p>
				<p>Place: {props.place}</p>
				<p>{isVip ? ticketPrice.vipPrice : ticketPrice.regularPrice} Kč</p>

				<footer className="flex flex-col gap-1.5 mt-4">{
					props.status === 'taken'
						? (
							<Button variant="outline" size="sm" disabled>
								Taken
							</Button>
						)
						: isInCart ? (
							<Button variant="destructive" size="sm">
								Remove from cart
							</Button>
						) : (
							<Button variant="default" size="sm">
								Add to cart
							</Button>
						)
				}</footer>
			</PopoverContent>
		</Popover>
	);
});
