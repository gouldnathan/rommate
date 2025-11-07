import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useState, useCallback} from 'react'
import AlertError from '@/components/ui/alert-error'
import Heading from '@/components/ui/heading'
import {
	Select,
	SelectPortal,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectViewport,
	SelectItemText,
	SelectValue,
	SelectIcon
} from '@/components/ui/select'
import {Switch} from '@/components/ui/switch'
import {PlatformRunner} from '@/models/enums/platform-runner'
import {ChevronDownIcon} from 'lucide-react'
import {RetroarchConfigForm} from './retroarch-config-form'

export type RetroarchConfigInputs = {
	installPath: string
	core: string
	args: string
}

export function PlatformConfigureForm({className, title, ...props}: React.ComponentProps<'form'>) {
	const {
		register,
		handleSubmit,
		formState: {errors, isValid, isSubmitting}
	} = useForm<RetroarchConfigInputs>()
	const [formError, setFormError] = useState<string | null>(null)
	const [runnerType, setRunnerType] = useState<string | null>(null)
	const [useFlatpak, setUseFlatpak] = useState<boolean>(false)

	const onSubmit: SubmitHandler<RetroarchConfigInputs> = useCallback(
		async (payload) => {
			console.log(payload)
			if (!isValid) {
				return
			}
			setFormError(null)
			try {
				console.log('Valid')
			} catch (error) {
				setFormError((error as Error).message)
			}
		},
		[isValid]
	)

	const options = Object.entries(PlatformRunner).map(([key, val]) => ({
		label: key,
		value: val
	}))

	return (
		<div className='z-10 py-12 gap-9 flex container flex-col px-header'>
			<Heading variant={'h1'} className='flex gap-2'>
				<span>{title}</span>
			</Heading>
			<form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={handleSubmit(onSubmit)}>
				<div className='grid grid-cols-6 gap-6'>
					<div className='col-start-1 col-span-3 gap-7 flex items-center'>
						<Select onValueChange={(e) => setRunnerType(e)}>
							<SelectTrigger>
								<SelectValue placeholder='Pick an option' />
								<SelectIcon>
									<ChevronDownIcon />
								</SelectIcon>
							</SelectTrigger>
							<SelectPortal>
								<SelectContent position='popper' className='w-100'>
									<SelectViewport>
										{options.map((o) => (
											<SelectItem key={o.value} value={o.value}>
												<SelectItemText>{o.label}</SelectItemText>
											</SelectItem>
										))}
									</SelectViewport>
								</SelectContent>
							</SelectPortal>
						</Select>
						{runnerType === PlatformRunner.Retroarch && (
							<Switch label='Use Flatpak' onCheckedChange={(v) => setUseFlatpak(v)}></Switch>
						)}
					</div>
				</div>
				{runnerType === PlatformRunner.Retroarch && (
					<RetroarchConfigForm register={register} errors={errors} useFlatpak={useFlatpak} />
				)}
				{runnerType === PlatformRunner.PCSX2 && <Button>PCSX2</Button>}
				{runnerType === PlatformRunner.Dolphin && <Button>Dolphin</Button>}
				{runnerType && (
					<Button type='submit' className='w-50' disabled={isSubmitting}>
						Save
					</Button>
				)}
				{formError && <AlertError title={'Configuration error.'} description={formError} />}
			</form>
		</div>
	)
}
