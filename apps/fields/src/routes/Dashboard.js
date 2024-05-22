import { useContext } from 'react';
import { DomainContext } from '../contexts';
import AppTemplate from '../components/global/AppTemplate';
import {
    QueryClient,
    QueryClientProvider,
    useQuery
} from '@tanstack/react-query';
import { DashboardAPI } from '../api/DashboardAPI';
import { NavLink } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

function Stat( { label, stat } ) {

    return(
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stat}</dd>
        </div>
    );

}

function ManageButtons( { labelSingular, labelPlural, manageRoute, createRoute } ) {
    return (
      <span className="isolate inline-flex rounded-md shadow-sm">
        <NavLink
          to={manageRoute}
          className="relative inline-flex gap-1 items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        >
            <span>
                Manage {labelPlural}
            </span>
            <ArrowUpRightIcon className="h-6 w-6 text-gray-500" />
        </NavLink>
        <NavLink
          to={createRoute}
          className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        >
            <span>
                Create {labelSingular}
            </span>
            <ArrowUpRightIcon className="h-6 w-6 text-gray-500" />
        </NavLink>
      </span>
    )
}

function FieldGroupCount( {recordCount} ) {
    return(
        <Stat 
            label="FIELD GROUP COUNT"
            stat={recordCount}
        />
    )
}

function FieldCount( {recordCount} ) {
    return(
        <Stat 
            label="FIELD COUNT"
            stat={recordCount}
        />
    )
}

function PostTypeCount( {recordCount} ) {
    return(
        <Stat 
            label="CUSTOM POST TYPE COUNT"
            stat={recordCount}
        />
    )
}

function TaxonomyCount( {recordCount} ) {
    return(
        <Stat 
            label="CUSTOM TAXONOMY COUNT"
            stat={recordCount}
        />
    )
}

function OptionsPageCount( {recordCount} ) {
    return(
        <Stat 
            label="OPTIONS PAGE COUNT"
            stat={recordCount}
        />
    )
}

function FormCount( {recordCount} ) {
    return(
        <Stat 
            label="FORM COUNT"
            stat={recordCount}
        />
    )
}

function DashboardSection({children}) {
    return(
        <li className="shadow p-6 grid gap-4">
            {children}
        </li>
    )
}

function SectionHeader({text}) {
    return(
        <header className="text-neutral-400 text-sm font-medium">
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
                IS LOADING
            </main>
        )
    }

    return(
        <div className="max-w-5xl flex flex-col">
            <section className="text-zinc-800">
                <h2 className="font-bold text-xl mb-5">
                    F3 Dashboard
                </h2>
            </section>
            <ul className="w-full grid grid-cols-2 gap-8">
                <DashboardSection>
                        <SectionHeader text="CUSTOM FIELDS" />
                        <FieldGroupCount 
                            recordCount={data.sdo_counts.field_groups.publish}
                        />
                        <ManageButtons 
                            manageRoute="/groups"
                            createRoute="/groups/create"
                            labelPlural="Field Groups"
                            labelSingular="Field Group"
                        />
                </DashboardSection>
                <DashboardSection>
                        <SectionHeader text="CUSTOM FIELDS" />
                        <FieldCount 
                            recordCount={data.sdo_counts.fields.publish}
                        />
                        <ManageButtons 
                            manageRoute="/fields"
                            createRoute="/fields/create"
                            labelPlural="Fields"
                            labelSingular="Field"
                        />
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="CUSTOM POST TYPES" />
                    <PostTypeCount 
                        recordCount={data.sdo_counts.post_types.publish}
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
                    <TaxonomyCount 
                        recordCount={data.sdo_counts.taxonomies.publish}
                    />
                    <ManageButtons 
                        manageRoute="/taxonomy"
                        createRoute="/taxonomy/create"
                        labelPlural="Taxonomies"
                        labelSingular="Taxonomy"
                    />
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="OPTIONS PAGES" />
                    <OptionsPageCount 
                        recordCount={data.sdo_counts.options_pages.publish}
                    />
                    <ManageButtons 
                        manageRoute="/options-page"
                        createRoute="/options-page/create"
                        labelPlural="Options Pages"
                        labelSingular="Options Page"
                    />
                </DashboardSection>
                <DashboardSection>
                    <SectionHeader text="FORMS" />
                    <FormCount 
                        recordCount={data.sdo_counts.forms.publish}
                    />
                    <ManageButtons 
                        manageRoute="/form"
                        createRoute="/form/create"
                        labelPlural="Forms"
                        labelSingular="Form"
                    />
                </DashboardSection>
            </ul>
        </div>
    )

}

export default function Dashboard() {

    const domain = useContext(DomainContext);
    const queryClient = new QueryClient();

    return(
        <QueryClientProvider client={queryClient}>
            <AppTemplate title="Dashboard">
                <DashboardContent />
            </AppTemplate>
        </QueryClientProvider>
    );

}