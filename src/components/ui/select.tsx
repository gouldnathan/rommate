import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

import {cn} from '@/lib/utils'
import {UseFormRegisterReturn} from 'react-hook-form'

function Select({
	register,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Root> & {register?: UseFormRegisterReturn}) {
	return <SelectPrimitive.Root data-slot='select' {...register} {...props} />
}

function SelectPortal({...props}: React.ComponentProps<typeof SelectPrimitive.Portal>) {
	return <SelectPrimitive.Portal data-slot='select-portal' {...props} />
}

function SelectIcon({...props}: React.ComponentProps<typeof SelectPrimitive.Icon>) {
	return <SelectPrimitive.Icon data-slot='select-portal' {...props} />
}

function SelectTrigger({className, ...props}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
	return (
		<SelectPrimitive.Trigger
			data-slot='select-trigger'
			className={cn(
				"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer h-9 px-4 py-2 has-[>svg]:px-3",
				className
			)}
			{...props}
		/>
	)
}

function SelectViewport({...props}: React.ComponentProps<typeof SelectPrimitive.Viewport>) {
	return <SelectPrimitive.Viewport data-slot='select-viewport' {...props} />
}

function SelectItemText({...props}: React.ComponentProps<typeof SelectPrimitive.ItemText>) {
	return <SelectPrimitive.ItemText data-slot='select-item-text' {...props} />
}

function SelectValue({...props}: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot='select-value' {...props} />
}

function SelectItemIndicator({...props}: React.ComponentProps<typeof SelectPrimitive.ItemIndicator>) {
	return <SelectPrimitive.ItemIndicator data-slot='select-item-indicator' {...props} />
}

function SelectContent({className, sideOffset = 4, ...props}: React.ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot='select-content'
				sideOffset={sideOffset}
				className={cn(
					'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md',
					className
				)}
				{...props}
			/>
		</SelectPrimitive.Portal>
	)
}

function SelectItem({
	className,
	inset,
	variant = 'default',
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item> & {
	inset?: boolean
	variant?: 'default' | 'destructive'
}) {
	return (
		<SelectPrimitive.Item
			data-slot='select-menu-item'
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	)
}

export {
	Select,
	SelectPortal,
	SelectTrigger,
	SelectContent,
	SelectViewport,
	SelectItem,
	SelectItemText,
	SelectItemIndicator,
	SelectValue,
	SelectIcon
}
