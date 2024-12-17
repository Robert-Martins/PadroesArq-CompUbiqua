import { IconProps } from "@/core/vo/types/components.props"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"

const Icon: React.FC<IconProps> = (props) => {
    return <MaterialCommunityIcons name={props.name} size={props.size ?? 32} color={props.color} />
}

export default Icon;