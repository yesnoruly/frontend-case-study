import { Button } from '@/components/ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/components/lib/utils.ts';
import React from 'react';

import { useUnit } from 'effector-react';

import { $vipTicketTypeId, $ticketPrice } from './model/tickets.ts';
import { $cartStore, addToCart, removeFromCart } from './model/cart.ts'

type TSeatProps = {
	place?: number,
	row?: number,
	className?: string,
	status: 'available' | 'taken',
	ticketTypeId?: string,
	seatId?: string,
}

export const Seat = React.forwardRef<HTMLDivElement, TSeatProps>((props, ref) => {

	const [vipTicketTypeId, ticketPrice, cartStore] = useUnit([$vipTicketTypeId, $ticketPrice, $cartStore])

	const isInCart = cartStore.inCart.some(item => item.seatId === props.seatId)
	const isVip = props.ticketTypeId === vipTicketTypeId;
	const isVipPrice = isVip ? ticketPrice.vipPrice : ticketPrice.regularPrice;

	const item = {
		seatId: props.seatId!,
		ticketTypeId: props.ticketTypeId!,
		place: props.place!,
		row: props.row!,
		price: isVipPrice!,
		isVip: isVip!,
	}

	return (
		<Popover>
			<PopoverTrigger>
				<div className={cn('size-8 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-color', isInCart && cn('bg-green-300 hover:bg-green-500'), props.className)} ref={ref}>
					<span className="text-xs text-zinc-400 font-medium">{isVip ? '[V]' : '[ ]'}</span>
				</div>
			</PopoverTrigger>

			<PopoverContent>
				<p>Row: {props.row}</p>
				<p>Place: {props.place}</p>
				<p>{isVipPrice} Kč</p>

				<footer className="flex flex-col gap-1.5 mt-4">{
					props.status === 'taken'
						? (
							<Button variant="outline" size="sm" disabled>
								Taken
							</Button>
						)
						: isInCart ? (
							<Button variant="destructive" size="sm" onClick={() => removeFromCart(item)}>
								Remove from cart
							</Button>
						) : (
							<Button variant="default" size="sm" onClick={() => addToCart(item)}>
								Add to cart
							</Button>
						)
				}</footer>
			</PopoverContent>
		</Popover>
	);
});
