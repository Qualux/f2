import AppTemplate from '../components/AppTemplate';
import {
    QueryClient,
    QueryClientProvider,
    useQuery
} from '@tanstack/react-query';
import { DashboardAPI } from '../api/DashboardAPI';
import { NavLink } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { SkeletonList } from 'shared';

function Stat( { label, stat } ) {

    return(
        <div className="overflow-hidden bg-neutral-100 px-4 py-5 sm:p-6 border-b border-solid border-neutral-400">
            <dt className="truncate text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stat}</dd>
        </div>
    );

}

function ManageButtons( { labelSingular, labelPlural, manageRoute, createRoute } ) {

    return (
      <span className="isolate inline-flex rounded-md shadow-sm px-2 my-2">
        <NavLink
          to={manageRoute}
          className="relative inline-flex gap-2 items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:z-10"
        >
            <span>
                Manage {labelPlural}
            </span>
            <ArrowUpRightIcon className="h-4 w-4 text-gray-500" />
        </NavLink>
        <NavLink
          to={createRoute}
          className="relative -ml-px inline-flex gap-2 items-center rounded-r-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50 focus:z-10"
        >
            <span>
                Create {labelSingular}
            </span>
            <ArrowUpRightIcon className="h-3 w-3 text-gray-500" />
        </NavLink>
      </span>
    )
}

function DashboardSection({children}) {
    return(
        <li className="shadow grid gap-0">
            {children}
        </li>
    )
}

function SectionHeader({text}) {
    return(
        <header className="bg-neutral-700 text-neutral-200 text-sm font-medium py-1 px-2">
            {text}
        </header>
    )
}

function DashboardContent() {

    const { data, error, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: () => DashboardAPI.get(),
    });

    if( isLoading ) {
        return(
            <main>
                <SkeletonList />
            </main>
        )
    }

    return(
        <div className="flex flex-col">
            <ul className="w-full grid grid-cols-3 gap-6">
                <DashboardSection>
                    <SectionHeader text="F3 FIELD GROUPS" />
                    <Stat 
                        label="FIELD GROUPS"
                        stat={data.sdo_counts.field_groups.publish}
                    />
                    <ManageButtons 
                        manageRoute="/field-group"
                        createRoute="/field-group/create"
                        labelPlural="Field Groups"
                        labelSingular="Field Group"
                    />
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="F3 FIELDS" />
                    <Stat 
                        label="FIELDS"
                        stat={data.sdo_counts.fields.publish}
                    />
                    <ManageButtons 
                        manageRoute="/field"
                        createRoute="/field/create"
                        labelPlural="Fields"
                        labelSingular="Field"
                    />
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="CUSTOM POST TYPES" />
                    <Stat 
                        label="POST TYPES"
                        stat={data.sdo_counts.post_types.publish}
                    />
                    <ManageButtons 
                        manageRoute="/post-type"
                        createRoute="/post-type/create"
                        labelPlural="Post Types"
                        labelSingular="Post Type"
                    />
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="CUSTOM TAXONOMIES" />
                    <Stat 
                        label="TAXONOMIES"
                        stat={data.sdo_counts.taxonomies.publish}
                    />
                    <ManageButtons 
                        manageRoute="/taxonomy"
                        createRoute="/taxonomy/create"
                        labelPlural="Taxonomies"
                        labelSingular="Taxonomy"
                    />
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="F3 OPTIONS PAGES" />
                    <Stat 
                        label="OPTIONS PAGES"
                        stat={data.sdo_counts.options_pages.publish}
                    />
                    <ManageButtons 
                        manageRoute="/options-page"
                        createRoute="/options-page/create"
                        labelPlural="Options Pages"
                        labelSingular="Options Page"
                    />
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="F3 FORMS" />
                    <Stat 
                        label="FORM COUNT"
                        stat={data.sdo_counts.forms.publish}
                    />
                    <ManageButtons 
                        manageRoute="/form"
                        createRoute="/form/create"
                        labelPlural="Forms"
                        labelSingular="Form"
                    />
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="F3 GRIDS" />
                    <Stat 
                        label="GRIDS"
                        stat={data.sdo_counts.grids.publish}
                    />
                    <ManageButtons 
                        manageRoute="/grid"
                        createRoute="/grid/create"
                        labelPlural="Grids"
                        labelSingular="Grids"
                    />
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="F3 QUERIES" />
                    <Stat 
                        label="QUERIES"
                        stat={data.sdo_counts.queries.publish}
                    />
                    <ManageButtons 
                        manageRoute="/query"
                        createRoute="/query/create"
                        labelPlural="Queries"
                        labelSingular="Queries"
                    />
                </DashboardSection>
            </ul>
        </div>
    )

}

export default function Dashboard() {

    const queryClient = new QueryClient();

    return(
        <QueryClientProvider client={queryClient}>
            <AppTemplate title="Dashboard">
                <DashboardContent />
            </AppTemplate>
        </QueryClientProvider>
    );

}