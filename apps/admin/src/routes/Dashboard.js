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
        <div className="overflow-hidden px-4 py-5 sm:p-6">
            <dt className="truncate text-sm font-light text-neutral-400">{label}</dt>
            <dd className="mx-0 p-0 mt-1 text-3xl font-semibold tracking-tight text-neutral-400">{stat}</dd>
        </div>
    );

}

function ManageButtons( { manageRoute, createRoute } ) {

    return (
      <span className="isolate inline-flex rounded-md px-2 my-2">
        <NavLink
          to={manageRoute}
          className="no-underline relative inline-flex gap-2 items-center rounded-l-md bg-white/5 px-3 py-2 text-sm font-normal text-neutral-300 hover:text-neutral-300 hover:bg-white/10 focus:z-10"
        >
            <span>
                Manage
            </span>
            <ArrowUpRightIcon className="h-4 w-4 text-gray-500" />
        </NavLink>
        <NavLink
          to={createRoute}
          className="ml-px no-underline relative inline-flex gap-2 items-center rounded-r-md bg-white/5 px-3 py-2 text-sm font-normal text-neutral-300 hover:text-neutral-300 hover:bg-white/10 focus:z-10"
        >
            <span>
                Create
            </span>
            <ArrowUpRightIcon className="h-4 w-4 text-gray-500" />
        </NavLink>
      </span>
    )
}

function DashboardSection({children}) {
    return(
        <li className="border border-solid border-white/5 shadow-xl shadow-white grid gap-0 items-start py-3 px-2">
            {children}
        </li>
    )
}

function SectionHeader({text}) {
    return(
        <header className="text-neutral-600 text-2xl font-light py-1 px-6">
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
            <ul className="w-full grid grid-cols-3 gap-6 items-stretch">
                <DashboardSection>
                    <SectionHeader text="FIELDS & FORMS" />
                    <div className="flex gap-8 items-center justify-between">
                        <Stat 
                            label="FIELD GROUPS"
                            stat={data.sdo_counts.field_groups.publish}
                        />
                        <ManageButtons 
                            manageRoute="/field-group"
                            createRoute="/field-group/create"
                        />
                    </div>
                    <div className="flex gap-8 items-center justify-between">
                        <Stat 
                            label="FIELDS"
                            stat={data.sdo_counts.fields.publish}
                        />
                        <ManageButtons 
                            manageRoute="/field"
                            createRoute="/field/create"
                        />
                    </div>
                    <div className="flex gap-8 items-center justify-between">
                        <Stat 
                            label="FORMS"
                            stat={data.sdo_counts.forms.publish}
                        />
                        <ManageButtons 
                            manageRoute="/form"
                            createRoute="/form/create"
                        />
                    </div>
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="WORDPRESS REGISTER" />
                    <div className="flex gap-8 items-center justify-between">
                        <Stat 
                            label="POST TYPES"
                            stat={data.sdo_counts.post_types.publish}
                        />
                        <ManageButtons 
                            manageRoute="/post-type"
                            createRoute="/post-type/create"
                        />
                    </div>
                    <div className="flex gap-8 items-center justify-between">
                        <Stat 
                            label="TAXONOMIES"
                            stat={data.sdo_counts.taxonomies.publish}
                        />
                        <ManageButtons 
                            manageRoute="/taxonomy"
                            createRoute="/taxonomy/create"
                        />
                    </div>
                    <div className="flex gap-8 items-center justify-between">
                        <Stat 
                            label="OPTIONS PAGES"
                            stat={data.sdo_counts.options_pages.publish}
                        />
                        <ManageButtons 
                            manageRoute="/options-page"
                            createRoute="/options-page/create"
                        />
                    </div>
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="ABOUT F3" />
                    <div className="grid gap-8">
                        <Stat 
                            label="LICENSE"
                            stat="F3 STANDARD"
                        />
                        <Stat 
                            label="VERSION"
                            stat="F3 v1.0.0"
                        />
                    </div>
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="GRIDS & QUERIES" />
                    <div className="flex gap-8 items-center justify-between">
                        <Stat 
                            label="GRIDS"
                            stat={data.sdo_counts.grids.publish}
                        />
                        <ManageButtons 
                            manageRoute="/grid"
                            createRoute="/grid/create"
                        />
                    </div>
                    <div className="flex gap-8 items-center justify-between">
                        <Stat 
                            label="QUERIES"
                            stat={data.sdo_counts.queries.publish}
                        />
                        <ManageButtons 
                            manageRoute="/query"
                            createRoute="/query/create"
                        />
                    </div>
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