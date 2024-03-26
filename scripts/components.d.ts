/**
 * Adds components from a specified directory to another directory.
 * Prompts the user to select which components to add.
 *
 * @async
 * @function addComponents
 *
 * @returns {Promise<void>} - A promise that resolves when the components are added successfully.
 */
export function addComponents(): Promise<void>;
/**
 * Adds groups of livingdocs to a specified output directory.
 * @returns {boolean} - Returns true if groups were added successfully.
 */
export function addGroups(): boolean;
/**
 * Removes livingdocs components based on user selection.
 *
 * @returns {Promise<void>} A promise that resolves once the components are removed.
 */
export function removeComponents(): Promise<void>;
/**
 * Removes livingdocs groups from the specified directory.
 *
 * @returns {boolean} Returns true if the livingdocs groups were successfully removed, otherwise false.
 */
export function removeGroups(): boolean;
/**
 * Create a component with the given name. If the component name is not provided, it prompts the user to enter a name.
 * If the component name does not have a group, it prompts the user to select a group.
 * Once the component name and group are determined, it writes the component.
 *
 * @param {string} name - The name of the component (optional)
 * @return {boolean} - Returns true
 */
export function createComponent(name: string): boolean;
/**
 * Creates a group.
 *
 * @param {string} group - The name of the group to be created. If not provided, user will be prompted to enter the group name.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating if the group was successfully created or not.
 */
export function createGroup(group: string): Promise<boolean>;
