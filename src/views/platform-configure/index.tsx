import usePlatforms from '@/hooks/api/use-platforms'
import {PlatformConfigureForm} from './components/platform-configure'
import {useParams} from 'react-router'

export default function PlatformConfigure() {
	const params = useParams()
	const platformId = params.id
	const {data: platforms, isLoading, error} = usePlatforms()

	if (isLoading || error) {
		return null
	}
	const platform = platforms?.find((platform) => platform.id.toString() === platformId)

	return <PlatformConfigureForm title={platform?.fsSlug} />
}
