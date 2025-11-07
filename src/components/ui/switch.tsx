import * as SwitchPrimitive from '@radix-ui/react-switch'

function Switch({label, ...props}: React.ComponentProps<typeof SwitchPrimitive.Root> & {label: string}) {
	return (
		<label className='flex space-x-4 text-primary'>
			<SwitchPrimitive.Root
				onCheckedChange={props.onCheckedChange}
				className='data-[state=checked]:bg-sky-500 active:data-[state=checked]:bg-sky-400 w-11 rounded-full bg-gray-700 items-center p-px shadow-inner shadow-black/50 transition focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:bg-gray-600'
			>
				<SwitchPrimitive.Thumb className='data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-white block h-6 w-6 rounded-full bg-gray-200 shadow-sm transition' />
			</SwitchPrimitive.Root>
			<span className='font-medium'>{label}</span>
		</label>
	)
}

export {Switch}
