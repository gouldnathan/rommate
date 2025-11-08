import {FieldErrors, UseFormRegister, UseFormReturn, Controller} from 'react-hook-form'
import {FormInput, PathFormInput} from '@/components/ui/form-input'
import {RetroarchConfigInputs} from './platform-configure'
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
import {ChevronDownIcon} from 'lucide-react'
import {useState, useEffect} from 'react'
import {readDir} from '@tauri-apps/plugin-fs'
import {homeDir} from '@tauri-apps/api/path'

export function RetroarchConfigForm({
	register,
	errors,
	useFlatpak,
	form
}: {
	register: UseFormRegister<RetroarchConfigInputs>
	errors: FieldErrors<RetroarchConfigInputs>
	useFlatpak: boolean
	form: UseFormReturn<RetroarchConfigInputs, any, RetroarchConfigInputs>
}) {
	const [installPath, setInstallPath] = useState<string>('')
	const [coreOptions, setCoreOptions] = useState<{label: string; value: string}[] | null>(null)

	const setPath = (e: string | null) => {
		const nonNull = e ?? ''
		setInstallPath(nonNull)
	}

	useEffect(() => {
		async function readCoreDir() {
			let coreDirectory = `${installPath}/cores`
			if (useFlatpak) {
				coreDirectory = `${await homeDir()}/.var/app/org.libretro.RetroArch/config/retroarch/cores`
			}
			const dirEntries = await readDir(coreDirectory)
			const coreOptions = dirEntries
				.filter((e) => e.isFile)
				.map((f) => ({
					label: f.name.replace(/\\.[^/.]+$/, ''),
					value: f.name
				}))
			setCoreOptions(coreOptions)
		}
		readCoreDir()
	}, [useFlatpak, installPath])

	return (
		<div className='grid grid-cols-6 gap-6'>
			{!useFlatpak && (
				<PathFormInput
					className='col-start-1 col-span-3'
					label='Installation Directory'
					id='install-path'
					onFileSelected={setPath}
					onChange={(e) => setInstallPath(e.target.value)}
					value={installPath}
					directory={true}
					register={register('installPath', {required: true})}
					fieldError={errors.installPath}
				/>
			)}
			<Controller
				name='core'
				control={form.control}
				defaultValue=''
				render={({field}) => (
					<Select name='core' onValueChange={field.onChange}>
						<SelectTrigger className='col-start-1'>
							<SelectValue placeholder='Select a core...' />
							<SelectIcon>
								<ChevronDownIcon />
							</SelectIcon>
						</SelectTrigger>
						<SelectPortal>
							<SelectContent position='popper' className='w-100'>
								<SelectViewport>
									{coreOptions?.map((o) => (
										<SelectItem key={o.value} value={o.value}>
											<SelectItemText>{o.label}</SelectItemText>
										</SelectItem>
									))}
								</SelectViewport>
							</SelectContent>
						</SelectPortal>
					</Select>
				)}
			/>
			<FormInput
				className='col-start-1 col-span-2'
				label='Extra Arguments'
				id='args'
				register={register('args')}
				fieldError={errors.args}
			/>
		</div>
	)
}
