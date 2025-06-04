"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Select, { StylesConfig } from "react-select";
import { useMemo, useCallback, useState } from "react";
import { debounce } from "lodash";
import { FamilyMember } from "@/types/familytree";

interface RelationshipExplorerProps {
  members: FamilyMember[];
  person1Id: string;
  setPerson1Id: (id: string) => void;
  person2Id: string;
  setPerson2Id: (id: string) => void;
  relationship: string | null;
  setRelationship: (rel: string | null) => void;
  findRelationship: (id1: number, id2: number) => string;
  show: boolean;
  setShow: (show: boolean) => void;
}

type SelectOption = {
  value: string;
  label: string;
};

export function RelationshipExplorer({
  members,
  person1Id,
  setPerson1Id,
  person2Id,
  setPerson2Id,
  relationship,
  setRelationship,
  findRelationship,
  show,
  setShow,
}: RelationshipExplorerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const selectOptions = useMemo(
    () =>
      members.map((member) => ({
        value: member.id.toString(),
        label: member.name,
      })),
    [members]
  );

  const debouncedSetPerson1Id = useMemo(
    () => debounce((value: string) => setPerson1Id(value), 300),
    [setPerson1Id]
  );

  const debouncedSetPerson2Id = useMemo(
    () => debounce((value: string) => setPerson2Id(value), 300),
    [setPerson2Id]
  );

  const handlePerson1Change = useCallback(
    (option: SelectOption | null) => {
      debouncedSetPerson1Id(option ? option.value : "");
    },
    [debouncedSetPerson1Id]
  );

  const handlePerson2Change = useCallback(
    (option: SelectOption | null) => {
      debouncedSetPerson2Id(option ? option.value : "");
    },
    [debouncedSetPerson2Id]
  );

  const handleFindRelationship = useCallback(async () => {
    if (!person1Id || !person2Id) {
      setRelationship("Please select both family members.");
      return;
    }
    if (person1Id === person2Id) {
      setRelationship("Cannot find relationship with the same person.");
      return;
    }
    setIsLoading(true);
    try {
      setRelationship(findRelationship(Number(person1Id), Number(person2Id)));
    } catch (error) {
      setRelationship(
        `Error calculating relationship: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  }, [person1Id, person2Id, findRelationship, setRelationship]);

  const selectStyles: StylesConfig<SelectOption, false> = {
    control: (base) => ({
      ...base,
      borderRadius: "0.375rem",
      padding: "0.25rem",
    }),
    menu: (base) => ({
      ...base,
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "" : "transparent",
    }),
    placeholder: (base) => ({
      ...base,
      opacity: "1",
    }),
    singleValue: (base) => ({
      ...base,
    }),
    noOptionsMessage: (base) => ({
      ...base,
    }),
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => setShow(!show)}
        className="rounded-full w-14 h-14 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 shadow-lg"
        aria-label={
          show ? "Close Relationship Explorer" : "Open Relationship Explorer"
        }
        aria-expanded={show}
      >
        <Users className="h-6 w-6" />
      </Button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 max-w-[90vw]"
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Relationship Explorer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label
                    htmlFor="person1"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Person 1
                  </label>
                  <Select<SelectOption>
                    inputId="person1"
                    options={selectOptions}
                    value={
                      selectOptions.find(
                        (option) => option.value === person1Id
                      ) || null
                    }
                    onChange={handlePerson1Change}
                    placeholder="Search family member..."
                    className="mt-1 text-sm relationship-explorer-select"
                    classNamePrefix="relationship-explorer-select"
                    styles={selectStyles}
                    isClearable
                  />
                </div>
                <div>
                  <label
                    htmlFor="person2"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Person 2
                  </label>
                  <Select<SelectOption>
                    inputId="person2"
                    options={selectOptions}
                    value={
                      selectOptions.find(
                        (option) => option.value === person2Id
                      ) || null
                    }
                    onChange={handlePerson2Change}
                    placeholder="Search family member..."
                    className="mt-1 text-sm relationship-explorer-select"
                    classNamePrefix="relationship-explorer-select"
                    styles={selectStyles}
                    isClearable
                  />
                </div>
                <Button
                  className="w-full"
                  size="sm"
                  onClick={handleFindRelationship}
                  disabled={!person1Id || !person2Id || isLoading}
                >
                  {isLoading ? "Calculating..." : "Find Relationship"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={() => {
                    setPerson1Id("");
                    setPerson2Id("");
                    setRelationship(null);
                  }}
                >
                  Clear Selections
                </Button>
                {relationship && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
                    {relationship}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
